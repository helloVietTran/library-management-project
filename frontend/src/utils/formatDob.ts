import dayjs from 'dayjs';

const formatDob = (dob: string) => {
  return dayjs(dob).format('D/M/YYYY');
};

export default formatDob;