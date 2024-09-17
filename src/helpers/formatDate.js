function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const year = date.getFullYear();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = date.getMonth();
  const month = monthNames[monthIndex];

  const suffixes = ["st", "nd", "rd", "th"];
  let suffix = "th";
  if (day >= 1 && day <= 3) {
    suffix = suffixes[day - 1];
  }

  return `${day}${suffix} ${month} ${year}`;
}

export default formatDate