exports.getStartDate = () => {
  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();

  const res = `${thisYear}-${editDate(thisMonth)}-01`;
  return res;

  // setStartDate(`${thisYear}-${editDate(thisMonth)}-01`);
  // setEndDate(`${thisYear}-12-${getLastDayOfMonth(thisYear, 12)}`);
};

exports.getEndDate = () => {
  // const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();

  const res = `${thisYear}-12-${getLastDayOfMonth(thisYear, 12)}`;
  return res;
};

const getLastDayOfMonth = (year, month) => {
  //   const d = new Date(year, month + 1, 0);
  const d = new Date(year, month, 0);
  const dDay = d.getDate();
  //   console.log("zaaa", d, dDay);
  return dDay;
};

const editDate = (date) => {
  if (date.length > 1) return date;
  return `0${date}`;
};
exports.editDate = (date) => {
  if (date.length > 1) return date;
  return `0${date}`;
};
