const timer = (time, format) => {
  const date = isNaN(new Date(time).getTime()) ? strReplace(time) : time;
  console.log('time ----- ', date);
  console.log('date ----- ', new Date(time).getTime());
  return new Date(date).getTime();
}

function strReplace(str) {
  const timeList = str.split(' ');
  const date = timeList[0] && timeList[0].replace(/\D/g, '-');
  const time = timeList[1] && timeList[1].replace(/\D/g, ':');
  return `${date.slice(0, date.length - 1)} ${time.slice(0, time.length - 1)}`;
}

export default timer;