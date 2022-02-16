import styled from "styled-components";
import { TextField, Button, Popper, Dialog } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const Card = styled.div`
  padding: 20px;
  min-width: 400px;
  min-height: 75vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgb(240, 241, 240);
  border-radius: 1rem;
  box-shadow: 0 5px 10px rgb(229 247 229);
  .title {
    font-size: 30px;
    color: #42b5e8;
    font-weight: 600;
    margin-bottom: 30px;
  }
  form,
  .footerSignIn {
    margin-top: 18px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  .footerSignIn {
    margin-top: 0px;
  }
  .emailaddress,
  .password {
    margin-bottom: 14px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
  }
  .emailaddress input,
  .password input {
    min-width: 310px;
    border-radius: 10px;
    font-size: 1rem;
  }
  .emailaddress label,
  .password label {
    margin-bottom: 12px;
    margin-top: 8px;
    color: rgb(60, 181, 232);
    font-weight: 600;
  }
  a {
    color: #000;
    margin-top: 8px;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const MuiTextfield = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontFamily: "Montserrat",
    "& fieldset": {
      borderRadius: "10px",
      border: "2px solid rgb(240,241,240)",
    },
    "&:hover fieldset": {
      borderColor: "rgb(240,241,240)",
    },
    "&.Mui-focused fieldset": {
      outline: 0,
      border: "none",
      boxShadow: "0 0 0 0.2rem rgb(32 168 216 / 25%)",
    },
  },
});

const StatusStyledTableCell = styled(TableCell)`
  div.statusCell {
    background-color: ${(props) => {
      if (props.status === "live") {
        return "#ffc2c2";
      }
      if (props.status === "ended") {
        return "#c1c0c0";
      }
    }};
    color: ${(props) => {
      if (props.status === "live") {
        return "#ff4141";
      }
    }};
    padding: 5px 10px;
    margin-bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    font-size: 12px;
    height: 25px;
    line-height: 15px;
  }
`;
const StyledTableContainer = styled(TableContainer)`
  &.MuiTableContainer-root {
    box-shadow: none;
  }
  .action__Delete {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 6px 10px;
    box-shadow: 0 3px 8px 0px rgb(0 0 0 / 15%);
    background-color: #fff;
    width: 121px;
    height: 33px;
    border: 0.8px solid #e1e1e1;
    border-radius: 5px;
    margin: 0;
  }
  .action__Delete__text {
    margin: 0;
  }
  .action__Delete__DeleteIcon {
    font-size: 1.3rem;
  }
`;
const StyledTableRow = styled(TableRow)`
  background-color: ${(props) => (props.index % 2 === 0 ? "#ecf5fd" : "#fff")};
  cursor: pointer;
  border: 1px solid #fff;
  opacity: 1;
  &:hover {
    border-left: 1px solid #42b5e8;
    opacity: 0.8;
  }
`;
const MuiButton = styled(Button)({
  "&.MuiButton-root": {
    border: "0px",
    fontSize: "1rem",
    margin: "20px auto",
    backgroundColor: "rgb(255, 176, 0)",
    boxShadow: "0 4px 8px rgb(0 0 0 / 20%)",
    textTransform: "none",
    width: "100%",
    height: "50px",
    lineHeight: "50px",
    borderRadius: "8px",
    color: "#fff",
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "rgb(255, 176, 0)",
      opacity: 0.8,
    },
  },
});

const CardTable = styled.div`
  width: 76%;
  height: 95%;
  display: block;
  margin: 8% auto;
  margin-top: 60px;
  background-color: #fff;
  padding: 30px 0 30px;
  border-radius: 1.85rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
`;
const StyledTable = styled(Table)`
  .MuiTableCell-root {
    font-family: "Montserrat", sans-serif;
    color: #000;
    padding: 12px 12px 8px;
  }
  overflow: hidden;
`;

const MButton = styled(Button)({
  "&.logout-Button": {
    backgroundColor: "transparent",
    fontSize: "0.95rem",
    float: "right",
    color: "#1890ff",
    fontFamily: "inherit",
    textTransform: "none",
    padding: "15px 25px",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:focus-visible": {
      backgroundColor: "transparent",
    },
  },
});
const StyledPopper = styled(Popper)`
  .MuiBox-root {
    width: 140%;
    margin-left: -23%;
    margin-top: -10px;
    background-color: #fff;
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.15);
  }
`;
const DialogLogout = styled(Dialog)`
  .MuiDialog-paper {
    top: -32%;
    width: 37%;
    color: rgba(0, 0, 0, 0.8);
  }
  .closeIcon {
    padding: 4px;
    width: 2rem;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
  .MuiDialogTitle-root {
    display: flex;
    color: rgba(0, 0, 0, 0.8) !important;
    justify-content: space-between;
    border-bottom: 1px solid #c8ced3;
    font-size: 17.5px;
  }
  .MuiDialogContent-root {
    border-bottom: 1px solid #c8ced3;
    font-size: 0.875rem;
  }
  .css-qfso29-MuiTypography-root-MuiDialogContentText-root {
    padding-top: 20px;
    font-size: 14px;
  }
  .MuiDialogContentText-root,
  .MuiButton-root,
  .MuiDialog-paper {
    font-family: Montserrat;
    font-size: 0.975rem;
  }
  .btnLogout {
    text-transform: none;
  }
  .btnLogout:hover {
    opacity: 0.8;
  }
  .MuiDialogActions-root {
    padding: 20px;
  }
`;
export {
  Card,
  Wrapper,
  MuiTextfield,
  MuiButton,
  StyledTable,
  CardTable,
  MButton,
  StyledPopper,
  DialogLogout,
  StyledTableContainer,
  StyledTableRow,
  StatusStyledTableCell,
};
