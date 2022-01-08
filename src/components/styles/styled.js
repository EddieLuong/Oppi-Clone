import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";
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
    fontSize: "17px",
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
    padding: "6px 0px",
  },
});

const CardTable = styled.div`
  width: 75%;
  height: 95%;
`;
const StyledTable = styled(MaterialTable)({});

export { Card, Wrapper, MuiTextfield, MuiButton, StyledTable, CardTable };
