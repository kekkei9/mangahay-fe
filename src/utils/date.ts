import { min } from "lodash";

export const formatDate = (dateString?: string) => {
  if (!dateString) return;
  const dateObj = new Date(dateString);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const formattedDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
  return formattedDate;
};
export const formatDateTimeHour = (dateString: string) => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
};

export const timeDiff = (time: string) => {
  const currentTime = new Date();
  const targetTime = new Date(time);

  // Tính khoảng cách thời gian
  const timeDiff = currentTime.getTime() - targetTime.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return days + " ngày trước";
  } else if (hours > 0) {
    return hours + " giờ trước";
  } else if (minutes > 0) {
    return minutes + " phút trước";
  } else {
    return seconds + " giây trước";
  }
};
