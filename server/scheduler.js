module.exports.scheduler = (duration) => {
  let time;
  let date = new Date();
  let month = date.getMonth();
  let dayOfMonth = date.getDate();
  let day = date.getDay();
  let range;
  let hour = date.getHours();
  let minute = Number(date.getMinutes()) + 1;
  if (duration === "minute") {
    time = "* * * * *";
  } else if (duration === "week") {
    time = `${minute} ${hour} * * ${day}`;
  } else if (duration === "other-week") {
    if (Number(dayOfMonth) < 17) {
      range = `${dayOfMonth},${Number(dayOfMonth) + 14}`;
    } else {
      range = `${Number(dayOfMonth) - 15 + 1},${dayOfMonth}`;
    }
    time = `${minute} ${hour} ${range} * *`;
  } else if (duration === "month") {
    time = `${minute} ${hour} ${dayOfMonth} * *`;
  }
  return time;
};
