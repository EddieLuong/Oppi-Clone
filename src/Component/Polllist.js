import {
  Popper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MaterialTable from "material-table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { handleDataToTable, columns, accessToken } from "./Others";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Polllist() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState(0);
  const [open, setOpen] = useState(false);
  const [isOpenDialogLogout, setIsOpenDialogLogout] = useState(false);
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);
  const [dataPolllistTable, setDataPolllistTable] = useState();
  const [currenPage, setCurrenPage] = useState(1);
  const [countPage, setCountPage] = useState(0);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setOpen((prevValue) => !prevValue);
    setAnchorEl(event.currentTarget);
  };
  const handleOpenDialog = () => {
    setIsOpenDialogLogout(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialogLogout(false);
  };
  const getPolllistData = (polllistArray) => {
    const rows = handleDataToTable(polllistArray);
    setDataPolllistTable(rows);
  };
  const handleChangePage = (page) => {
    setCurrenPage(page);
    setQuery((page - 1) * 10);
  };
  const handleLogOut = () => {
    localStorage.removeItem("AdminAccessToken");
    navigate("/");
  };
  useEffect(() => {
    axios
      .get(
        `https://dev.oppi.live/api/admin/v1/polls?offset=${query}&limit=10&direction=desc&search=`,
        {
          headers: {
            Authorization: `Bearer  ${accessToken}`,
          },
        }
      )
      .then((respon) => {
        getPolllistData(respon.data.list);
        let totalPage = respon.data.totalCount;
        if (totalPage % 10 === 0) {
          setCountPage(totalPage / 10);
        } else {
          setCountPage((totalPage - (totalPage % 10)) / 10 + 1);
        }
      });
  }, [query]);
  return (
    <div className="pollist">
      <Button endIcon={<KeyboardArrowDownIcon />} onClick={handleClick}>
        Oppi admin
      </Button>
      <Popper
        anchorEl={anchorEl}
        onClick={handleOpenDialog}
        open={open}
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
          Log out
        </Box>
      </Popper>
      <Dialog open={isOpenDialogLogout} onClose={handleCloseDialog}>
        <DialogTitle id="alert-dialog-title">
          {"Log Out"}
          <CloseRoundedIcon
            style={{ cursor: "pointer" }}
            onClick={handleCloseDialog}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
          <hr />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleLogOut} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <MaterialTable
        style={{ zIndex: -1 }}
        columns={columns}
        data={dataPolllistTable}
        options={{ toolbar: false, paging: false, actionsColumnIndex: -1 }}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (rowData) => console.log(rowData),
          },
        ]}
        components={{
          Action: () => (
            <div
              onClick={(event) => {
                setIsOpenDialogDelete((prev) => !prev);
              }}
            >
              <DeleteIcon />
              <p>Delete</p>
            </div>
          ),
        }}
      ></MaterialTable>
      <Dialog open={isOpenDialogDelete}>
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpenDialogDelete((prev) => !prev)}>
            Disagree
          </Button>
          <Button
            onClick={() => setIsOpenDialogDelete((prev) => !prev)}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Pagination
        count={countPage}
        color="primary"
        variant="outlined"
        size="large"
        shape="rounded"
        boundaryCount={3}
        siblingCount={2}
        page={currenPage}
        onChange={(event, page) => handleChangePage(page)}
      />
    </div>
  );
}
