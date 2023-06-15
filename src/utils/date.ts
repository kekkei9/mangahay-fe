export const padTime = (time: any, maxLength: number = 2) =>
  time.toString().padStart(maxLength, "0");

export const splitDateTime = (dateString: string) => {
  const dateObj = new Date(dateString);

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  return [day, month, year, hours, minutes, seconds];
};

export const splitFormatDateTime = (dateString: string) =>
  splitDateTime(dateString).map((unit) => unit.toString().padStart(2, "0"));

export const formatDate = (dateString?: string) => {
  if (!dateString) return;
  const [day, month, year] = splitFormatDateTime(dateString);

  return `${day}/${month}/${year}`;
};
export const formatDateTimeHour = (dateString: string) => {
  const [day, month, year, hours, minutes, seconds] =
    splitFormatDateTime(dateString);

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const timeDiff = (timeString: string) => {
  const currentTime = new Date();
  const targetTime = new Date(timeString);

  // Tính khoảng cách thời gian
  const timeDiff = currentTime.getTime() - targetTime.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return (days <= 30 ? days : "30+") + " ngày trước";
  }
  if (hours > 0) {
    return hours + " giờ trước";
  }
  if (minutes > 0) {
    return minutes + " phút trước";
  }
  return seconds + " giây trước";
};
