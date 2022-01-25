import React, { useState } from "react";
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { MButton, StyledPopper, DialogLogout } from "./styles/styled";
import axios from "axios";
import { ApiLogOut } from "../components/Utils";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopper, setOpenPopper] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const navigate = useNavigate();

  //handleClick Oppi Admin to Logout
  const handleClick = (event) => {
    setOpenPopper((prevValue) => !prevValue);
    setAnchorEl(event.currentTarget);
  };

  // Show/hide Dialog Log out
  const handleShowHideLogoutDialog = () => {
    setIsLogoutDialogOpen((prev) => !prev);
  };
  //Handle Logout
  const handleLogOut = () => {
    axios
      .post(ApiLogOut)
      .then((respon) => {
        if (respon.status === 200) {
          sessionStorage.removeItem("AdminAccessToken");
          // localStorage.removeItem("CACHED_URL");
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <React.Fragment>
      <div className="pollist_nav">
        <MButton
          disableRipple={true}
          className="logout-Button"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={handleClick}
        >
          Oppi Admin
        </MButton>
      </div>
      <StyledPopper
        className="popper-logout"
        anchorEl={anchorEl}
        onClick={handleShowHideLogoutDialog}
        open={openPopper}
        style={{ m: "50px" }}
      >
        <Box
          sx={{
            p: "10px 20px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "0.75rem",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#F0F3F5",
            },
          }}
        >
          Logout
        </Box>
      </StyledPopper>
      <DialogLogout
        open={isLogoutDialogOpen}
        onClose={handleShowHideLogoutDialog}
      >
        <DialogTitle id="alert-dialog-title">
          {"Log Out"}
          <CloseRoundedIcon
            className="closeIcon"
            style={{ cursor: "pointer" }}
            onClick={handleShowHideLogoutDialog}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="btnLogout"
            variant="container"
            style={{ backgroundColor: "#ccc" }}
            onClick={handleShowHideLogoutDialog}
          >
            Cancel
          </Button>
          <Button
            className="yesLogoutBtn btnLogout"
            style={{ backgroundColor: "#20a8d8", padding: "6px 12px" }}
            variant="contained"
            onClick={handleLogOut}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </DialogLogout>
    </React.Fragment>
  );
}
