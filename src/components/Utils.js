const ApiSignIn = "https://dev.oppi.live/api/admin/v1/auth/signin";
const accessToken = sessionStorage.getItem("AdminAccessToken");
const ApiLogOut = "https://dev.oppi.live/api/admin/v1/auth/signout";
const ApiDelete = "https://dev.oppi.live/api/admin/v1/polls";
const ApiPollDetail = "https://dev.oppi.live/api/admin/v1/polls";
const columns = [
  {
    title: "Poll Name",
    field: "title",
    cellStyle: {
      wordWap: "break word",
      width: "13%",
      wordBreak: "break-all",
    },
  },
  {
    title: "Poll Question",
    field: "question",
    cellStyle: {
      wordWap: "break word",
      wordBreak: "break-all",
      width: "22%",
    },
  },
  {
    title: "Start Date",
    field: "startDate",
    cellStyle: {
      width: "12%",
    },
  },
  {
    title: "End Date",
    field: "endDate",
    cellStyle: {
      width: "12%",
    },
  },
  { title: "Participants", field: "participants", align: "center" },
  {
    title: "Status",
    field: "status",
    render: (rowdata) => (
      <div
        style={
          rowdata.status === "live"
            ? {
                backgroundColor: "#ffc2c2",
                color: "red",
                textTransform: "uppercase",
              }
            : {
                backgroundColor: "#c1c0c0",
                color: "#000",
                textTransform: "uppercase",
              }
        }
        className="statusCell"
      >
        <p>{rowdata.status}</p>
      </div>
    ),
    align: "center",
  },
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
export {
  getPolllistData,
  formatDate,
  handleDataToTable,
  ApiSignIn,
  columns,
  accessToken,
  ApiLogOut,
  ApiDelete,
  ApiPollDetail,
};
