import styled from "styled-components";
import { TextField, Button, Popper, Dialog } from "@material-ui/core";
import MaterialTable from "material-table";

const Card = styled.div`
  padding: 20px;
  min-width: 390px;
  min-height: 80vh;
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
    padding: "12px",
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
  "&.MuiButton-text": {
    // padding: "6px 0px",
  },
});

const CardTable = styled.div`
  width: 75%;
  height: 95%;
  display: block;
  margin: 8% auto;
  margin-top: 60px;
  background-color: #fff;
  padding: 30px 0 30px;
  border-radius: 1.85rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
`;
const StyledTable = styled(MaterialTable)``;

const MButton = styled(Button)({
  "&.logout-Button": {
    backgroundColor: "transparent",
    float: "right",
    color: "#1890ff",
    fontFamily: "inherit",
    textTransform: "none",
    padding: "15px 25px",
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
};
