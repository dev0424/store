import dayjs from 'dayjs';

export const formatDate = (date: string, format = 'YYYY-MM-DD HH:mm:ss') =>
    dayjs(date).format(format);
