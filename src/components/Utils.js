export const fields = [
  "title",
  "question",
  "description",
  "openedAt",
  "closedAt",
  "isPublicResult",
  "resultRedirectUrl",
  "isRequireEmail",
];

const formatDate = (second, format) => {
  let time = new Date(second * 1000);
  let day = String(time.getDate()).padStart(2, "0");
  let month = String(time.getMonth() + 1).padStart(2, "0");
  let year = time.getFullYear();
  if (format && format.format === "YYYY-MM-DD") {
    return `${year}-${month}-${day}`;
  }
  return `${day}-${month}-${year}`;
};

const handleDataToTable = (polllistArray) => {
  return polllistArray.map((item) => {
    const {
      title,
      question,
      openedAt,
      closedAt,
      participantCount,
      status,
      id,
    } = item;
    return {
      title,
      question,
      startDate: formatDate(openedAt),
      endDate: formatDate(closedAt),
      participants: participantCount,
      status,
      id,
    };
  });
};
const getPolllistData = async (polllistArray) => {
  return handleDataToTable(polllistArray);
};
export { getPolllistData, formatDate, handleDataToTable };
