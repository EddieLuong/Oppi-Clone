const ApiSignIn = "https://dev.oppi.live/api/admin/v1/auth/signin";
const accessToken = sessionStorage.getItem("AdminAccessToken");
const ApiLogOut = "https://dev.oppi.live/api/admin/v1/auth/signout";
const ApiDelete = "https://dev.oppi.live/api/admin/v1/polls";
const ApiPollDetail = "https://dev.oppi.live/api/admin/v1/polls";
const columns = [
  { title: "Poll Name", field: "title" },
  { title: "Poll Question", field: "question" },
  { title: "Start Date", field: "startDate" },
  { title: "End Date", field: "endDate" },
  { title: "Participants", field: "participants" },
  { title: "Status", field: "status" },
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

export {
  formatDate,
  handleDataToTable,
  ApiSignIn,
  columns,
  accessToken,
  ApiLogOut,
  ApiDelete,
  ApiPollDetail,
};
