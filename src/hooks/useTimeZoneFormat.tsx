import dayjs from 'dayjs';

// dayjs().utc()
const useDayjsTz = () => {
  const dateFormat = useAppSelector(selectDateFormat);
  const timeFormat = useAppSelector(selectTimeFormat);
  const timezone = useAppSelector(selectTimeZone);
  const serviceTimezone = useAppSelector(selectServiceTimezone);

  return {
    dayjsTZDateFormat: (date: string) => {
      if (!date) return '-';
      const formaterDate = dayjs(date).tz(serviceTimezone);
      const now = dayjs().tz(timezone);

      const targetDate = formaterDate.tz(timezone);

      // 检查是否是同一天
      const isSameDay = now.isSame(targetDate, 'day');
      // 如果是同一天，展示时:分格式，否则展示日期格式
      return isSameDay
        ? targetDate.format('HH:mm')
        : targetDate.format(dateFormat);
    },
    dayjsTZTimeFormat: (date: string) => {
      if (!date) return '-';
      const formaterDate = dayjs(date).tz(serviceTimezone);

      return formaterDate ? formaterDate.tz(timezone).format(timeFormat) : '-';
    },
    // 将本地选中的时间日期转 转化成服务器对应的时区时间，再化成setting对应时区的时间
    formatDateToCustom: (date: string) => {
      if (!date) return '';
      const formaterDate = dayjs(date).tz(serviceTimezone);
      return formaterDate
        ? formaterDate.tz(timezone).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
        : '';
    },
    dayjsTZReplyDateFormat: (date: string, format: string) => {
      if (!date) return '-';
      const formaterDate = dayjs(date).tz(serviceTimezone);
      return formaterDate ? formaterDate.tz(timezone).format(format) : '-';
    }
  };
};

export default useDayjsTz;
