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
import {
  handleDataToTable,
  columns,
  accessToken,
  ApiLogOut,
  ApiDelete,
} from "./Utils";
import DeleteIcon from "@mui/icons-material/Delete";
import MaterialTable from "material-table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledTable, CardTable, Wrapper } from "./styles/styled";
export default function Polllist() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState(0);
  const [openPopper, setOpenPopper] = useState(false);
  const [isOpenDialogLogout, setIsOpenDialogLogout] = useState(false);
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);
  const [dataPolllistTable, setDataPolllistTable] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [idPollClicked, setIdPollClicked] = useState();
  const [sameQuery, setSameQuery] = useState(false); //use to re-render polllist table when delete
  const [countPage, setCountPage] = useState();
  //Handle Click event Oppi Admin
  const handleClick = (event) => {
    setOpenPopper((prevValue) => !prevValue);
    setAnchorEl(event.currentTarget);
  };
  //Open/close Dialog Log out
  const handleOpenDialog = () => {
    setIsOpenDialogLogout(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialogLogout(false);
  };

  //input: data get from API, out put: data in a row of Polllist Table
  const getPolllistData = (polllistArray) => {
    const rows = handleDataToTable(polllistArray);
    setDataPolllistTable(rows);
  };
  //Change page in Pagination: reset current page index and re-render polllist
  const handleChangePage = (page) => {
    setCurrentPage(page);
    setQuery((page - 1) * 10);
  };
  //Handle Logout
  const handleLogOut = () => {
    sessionStorage.removeItem("AdminAccessToken");
    navigate("/");
    axios
      .post(ApiLogOut)
      .then((respon) => console.log(respon))
      .catch((e) => console.log(e));
  };
  //Handle when click Cancel/click into space
  const handleCloseDialogDelete = () => {
    setIsOpenDialogDelete((prev) => !prev);
  };
  //Delete Poll
  const handleDeletePoll = () => {
    axios
      .delete(`${ApiDelete}/${idPollClicked}`, {
        headers: {
          Authorization: `Bearer  ${accessToken}`,
        },
      })
      .then((respon) => console.log(respon))
      .catch((err) => console.log(err));

    handleCloseDialogDelete();
    setSameQuery((prev) => !prev); //Re-render after delete
  };

  //Show poll detail when click on row
  const onRowClick = (event, rowData) => {
    event.stopPropagation();
    sessionStorage.setItem("idPollDetail", rowData.id);
    navigate("/polldetail");
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
  }, [query, sameQuery]);
  return (
    <div className="pollist">
      {/* Log out Section */}
      <Button endIcon={<KeyboardArrowDownIcon />} onClick={handleClick}>
        Oppi admin
      </Button>
      <Popper
        anchorEl={anchorEl}
        onClick={handleOpenDialog}
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

      {/* Polllist Table */}
      <Wrapper>
        <CardTable>
          <StyledTable
            style={{ marginTop: 50 }}
            columns={columns}
            data={dataPolllistTable}
            onRowClick={onRowClick}
            options={{ toolbar: false, paging: false, actionsColumnIndex: -1 }}
            actions={[
              {
                icon: "delete",
                tooltip: "Delete User",
                onClick: (event, data) => {
                  alert(data);
                },
              },
            ]}
            components={{
              Action: (props) => (
                <div
                  onClick={(event) => {
                    setIsOpenDialogDelete((prev) => !prev);
                    setIdPollClicked(props.data.id);
                    event.stopPropagation();
                  }}
                >
                  <DeleteIcon />
                  <p>Delete</p>
                </div>
              ),
            }}
          ></StyledTable>
          {/* //Pagination */}
          <Pagination
            count={countPage}
            color="primary"
            variant="outlined"
            size="large"
            shape="rounded"
            boundaryCount={3}
            siblingCount={2}
            page={currentPage}
            onChange={(event, page) => handleChangePage(page)}
          />
        </CardTable>

        <Dialog open={isOpenDialogDelete} onClose={handleCloseDialogDelete}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you would like to delete this poll?
              <br />
              Once deleted, it cannot be retrieved.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogDelete}>Keep Poll</Button>
            <Button onClick={handleDeletePoll} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Wrapper>
    </div>
  );
}
