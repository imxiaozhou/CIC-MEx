import { cloneElement, ReactElement } from 'react';

interface Props {
  children: ReactElement | string;
  /**
   * 14px -> s | 16px -> m | 18px -> l
   * */
  size: 's' | 'm' | 'l';
  /**
   * 控制 字体样式是注入到styles的某个属性中而不是普通的style， eg: Input 要注入到 style.input中
   * */
  styles?: string;
  /**
   * 当包裹的是Button组件时，默认button 的height 是 auto ，解决button内的字体大小变化时固定高度导致的上下不居中bug
   * */
  isChildBtn?: boolean;
}
const FontSize = (props: Props) => {
  const { children, size = 'm', styles, isChildBtn } = props;

  const fontSize = useAppSelector(selectFontSize) || 'MEDIUM';
  const sizeConfig: any = {
    SMALL: {
      l: {
        fontSize: 16
        // lineHeight: '24px',
      },
      m: {
        fontSize: 14
        // lineHeight: '21px',
      },
      s: {
        fontSize: 12
        // lineHeight: '18px',
      }
    },
    MEDIUM: {
      l: {
        fontSize: 18
        // lineHeight: '28px',
      },
      m: {
        fontSize: 16
        // lineHeight: '24px',
      },
      s: {
        fontSize: 14
        // lineHeight: '21px',
      }
    },
    LARGE: {
      l: {
        fontSize: 20
        // lineHeight: '32px',
      },
      m: {
        fontSize: 18
        // lineHeight: '28px',
      },
      s: {
        fontSize: 16
        // lineHeight: '24px',
      }
    }
  };
  const safeFontSize = sizeConfig[fontSize] ? fontSize : 'MEDIUM';
  const config = sizeConfig[safeFontSize][size] || { fontSize: 14 };

  if (
    typeof children === 'object' &&
    !(children instanceof Array) &&
    children !== null
  ) {
    if (styles) {
      return cloneElement(children, {
        ...children.props,
        styles: {
          ...children.props?.styles,
          [styles]: { ...children.props?.styles?.[styles], ...config }
        }
      });
    }
    return cloneElement(children, {
      style: {
        //  当包裹的是Button组件时，默认button 的height 是 auto ，解决button内的字体大小变化时固定高度导致的上下不居中bug
        ...(isChildBtn
          ? {
              height: 'auto'
            }
          : {}),

        ...children.props.style,
        ...config
      }
    });
  } else {
    return <span style={{ ...config }}>{children}</span>;
  }
};

export default FontSize;
