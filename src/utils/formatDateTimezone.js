const formatDate = (date) => {
  const timezoneOffset = 7; // Transform UTC to GMT+7
  const currentUTCHours = date.getUTCHours();

  date.setUTCHours(currentUTCHours + timezoneOffset);

  return date;
};

module.exports = formatDate;
