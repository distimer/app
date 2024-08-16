import moment from "moment";

export const consume = (seconds: number) => {
  seconds = Math.floor(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  const result = [];
  if (hours > 0) result.push(`${hours}시간`);
  if (minutes > 0) result.push(`${minutes}분`);
  if (sec > 0) result.push(`${sec}초`);
  return result.join(" ") || "기록 없음";
};

export const diff = (start: string, end: string) => {
  return moment(end).diff(moment(start), "seconds");
};

export const diffConsume = (start: string, end: string) => {
  return consume(diff(start, end));
};

export const timestamp = (current: string | Date, target?: string) => {
  if (target === undefined) {
    if (moment(current).minute() === 0) {
      return moment(current).format("M월 D일 (ddd) A h시");
    }
    return moment(current).format("M월 D일 (ddd) A h시 m분");
  }
  if (moment(current).isSame(target, "day")) {
    if (moment(target).minute() === 0) {
      return moment(target).format("A h시");
    }
    return moment(target).format("A h시 m분");
  } else {
    return moment(target).format("M월 D일 (ddd)");
  }
};
