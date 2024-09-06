// @ts-nocheck
// 验证手机号
export const isPhone = function (strNumber) {
  if (strNumber.length !== 11) {
    return false;
  }
  if (!/^1[3456789]\d{9}$/.test(strNumber)) {
    return false;
  }
  return true;
};

// 打开新开窗口并监听关闭
export const openNewWindow = function (url, callback) {
  window.name = 'origin';
  let windowObjectReference;
  // var strWindowFeatures =
  //   "width=1000,height=500,menubar=yes,location=yes,resizable=yes,scrollbars=true,status=true"; //窗口设置
  // url需打开的窗口路径例如：www.baidu.com
  function openRequestedPopup(url) {
    windowObjectReference = window.open(
      url,
      'name' + Math.random()
      // strWindowFeatures
    );
  }
  // 循环监听
  let loop = setInterval(() => {
    if (windowObjectReference.closed) {
      clearInterval(loop); // 停止定时器
      callback?.();
      // location.reload(); //刷新当前页面
    }
  }, 600);
  openRequestedPopup(url);
};

/**
 * 防抖(debounce)
 * @param {Function} fn
 * @param {Number} delay
 * @description 1.解决this指向问题 2.解决 event 事件对象问题
 */
export const debounce = function (fn, wait) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // eslint-disable-next-line no-invalid-this, @typescript-eslint/no-invalid-this
      fn.apply(this, arguments); // 把参数传进去
    }, wait);
  };
};

/**
 * 节流(throttle)
 * @param {Function} fn
 * @param {Number} delay
 * @description 请注意，节流函数并不止上面这种实现方案,例如可以完全不借助setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定间隔时间来做判定。
 * 也可以直接将setTimeout的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行fn之后消除定时器表示激活，原理都一样
 */
export const throttle = function (fn, delay) {
  let valid = true;
  return function () {
    if (!valid) {
      // 休息时间 暂不接客
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
};

/**
 * 复制文本
 * @param {String} text
 * @param {Function} callback
 */
export async function copyText(text: string, callback: Function) {
  try {
    await navigator.clipboard.writeText(text);
    if (callback) {
      callback(text);
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    if (callback) {
      callback(null);
    }
  }
}

/**
 * 下载文件
 * @param {String} href
 * @param {String} fileName
 */
export function downloadFile(href, fileName) {
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 下载流数据文件
 * @param {FileStream} streamData
 * @param {String} fileName
 * @param {ContentType} type
 */
export function downloadStreamFile(streamData, fileName = '', type?) {
  let blob = new Blob([streamData], { type });
  const fileUrl = window.URL.createObjectURL(blob);
  downloadFile(fileUrl, fileName);
  window.URL.revokeObjectURL(fileUrl); // 释放内存
}

export function printStreamFile(streamData, fileName = '', type?) {
  let blob = new Blob([streamData], { type });
  return window.URL.createObjectURL(blob);
}

/**
 * 处理长文本显示
 * @param {String} text
 * @param {Number} length
 * @return
 */
export function handleLongText(text, length, icon) {
  return text && text.length > length
    ? text.slice(0, length) + (icon || '...')
    : text;
}

/**
 * 扁平化树数据为数组
 * @param data
 * @param nodeKey
 * @returns
 */
export function flatArrTree(data: object[], nodeKey: string, parent?: string) {
  let newData = JSON.parse(JSON.stringify(data));
  if (newData.length === 0) {
    return [];
  }
  let arr = [];
  for (let leaf of newData) {
    const child = leaf[nodeKey];
    if (child) {
      const flatChild = flatArrTree(child, nodeKey, leaf.key);
      delete leaf[nodeKey];
      arr = [...arr, { ...leaf, _parent_: parent }, ...flatChild];
    } else {
      arr.push({ ...leaf, _parent_: parent });
    }
  }
  return arr;
}

export function deepCompareArrays(a1, a2) {
  if (a1.length !== a2.length) {
    return false;
  }

  for (let i = 0; i < a1.length; i++) {
    if (Array.isArray(a1[i]) && Array.isArray(a2[i])) {
      if (!deepCompareArrays(a1[i], a2[i])) {
        return false;
      }
    } else if (typeof a1[i] === 'object' && typeof a2[i] === 'object') {
      if (!Object.is(a1[i], a2[i])) {
        return false;
      }
    } else if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}

// 前端排序
export const sortFun = (
  a: { [x: string]: string },
  b: { [x: string]: string },
  dataIndex: string
) => {
  const stringA = a[dataIndex].toUpperCase();
  const stringB = b[dataIndex].toUpperCase();

  if (stringA < stringB) {
    return -1;
  }
  if (stringA > stringB) {
    return 1;
  }
  return 0;
};

export const showMultipleLabel = (label): string => {
  if (Array.isArray(label)) {
    return label.join(' | ');
  } else if (typeof label === 'string') {
    return label;
  }
  return '-';
};

export const translationAllLabel = (datas: LabelValue[]): LabelValue[] =>
  datas.map((item) => ({
    label: $t(item.label),
    value: item.value
  }));

export function validateDeep(obj: Record<string, any>): boolean {
  if (obj === null) return false;

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (Array.isArray(value)) {
      if (
        !value.length ||
        value.some((item) => Object.values(item).some((v) => v === null))
      ) {
        return false;
      }
    } else if (typeof value === 'object') {
      if (!validateDeep(value)) {
        return false;
      }
    } else if (value === null) {
      return false;
    }
  }

  return true;
}

export const getInitials = (name: string) => {
  const words = name.split(' ');
  if (words.length >= 2) {
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  } else {
    return name.charAt(0).toUpperCase();
  }
};

export const isCertificateExpired = (data: any): boolean => {
  return data?.textItems?.certificateStatus === 'Expired';
};

// 使用HSV转RGB算法得到颜色值
const hsvToRgb = (h: number, s: number, v: number): string => {
  let r;
  let g;
  let b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
    b * 255
  )})`;
};

export const hashToBgColor = (char: string = ''): string => {
  // 得到背景颜色
  let hash = 0;
  for (let i = 0; i < char.length; i++) {
    hash = char.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `hsl(${hash % 360}, 50%, 90%)`;
};

export const hashToColor = (char: string = ''): string => {
  // 得到字体颜色
  // 简单的哈希函数示例，用于将字符转换为颜色
  let hash = 0;
  for (let i = 0; i < char.length; i++) {
    hash = char.charCodeAt(i) + ((hash << 5) - hash);
  }

  // 将哈希值映射到0-360度区间，用于HSV色彩模式中的色调部分
  const hue = hash % 360;

  const saturation = 0.6; // 饱和度
  const value = 0.7; // 明度

  return hsvToRgb(hue / 360, saturation, value);
};
