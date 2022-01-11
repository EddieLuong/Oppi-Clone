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
import {
  StyledTable,
  CardTable,
  Wrapper,
  MButton,
  StyledPopper,
  DialogLogout,
} from "./styles/styled";

export default function Polllist() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState(0);
  const [openPopper, setOpenPopper] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dataPolllistTable, setDataPolllistTable] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [idPollClicked, setIdPollClicked] = useState(0);
  const [sameQuery, setSameQuery] = useState(false); //use to re-render polllist table when delete
  const [countPage, setCountPage] = useState(0);

  //handleClick Oppi Admin to Logout
  const handleClick = (event) => {
    setOpenPopper((prevValue) => !prevValue);
    setAnchorEl(event.currentTarget);
  };
  //Show/hide Dialog Log out
  const handleShowHideLogoutDialog = () => {
    setIsLogoutDialogOpen((prev) => !prev);
  };

  //input: data get from API, out put: data in rows of Polllist Table
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
      .then((respon) => console.log("Log out Success!!!"))
      .catch((e) => console.log(e));
  };
  //Handle when click Cancel/click into space
  const handleCloseDialogDelete = () => {
    setIsDeleteDialogOpen((prev) => !prev);
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

      {/* Polllist Table */}
      <CardTable>
        <StyledTable
          style={{
            marginTop: 50,
          }}
          columns={columns}
          data={dataPolllistTable}
          onRowClick={onRowClick}
          options={{
            toolbar: false,
            paging: false,
            actionsColumnIndex: -1,
            sorting: false,
            headerStyle: {
              backgroundColor: "#fafafa",
              color: "#23282C",
              fontFamily: "Montserrat",
              fontWeight: "600",
            },
            rowStyle: (row) => {
              const styles = {
                fontSize: 13.5,
                height: 26,
                color: "#23282C",
                fontWeight: 400,
              };
              if (row.tableData.id % 2 !== 0) {
                styles.backgroundColor = "#fff";
              } else styles.backgroundColor = "#ecf5fd";
              return styles;
            },
          }}
          style={{ boxShadow: "none" }}
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
                style={{
                  display: "inline-flex",
                  width: 121,
                  height: 30,
                  marginRight: 10,
                  justifyContent: "center",
                  border: "0.8px solid #E1E1e1",
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  padding: "3px 0",
                  boxShadow: "0 2px 4px rgb(0 0 0 / 20%)",
                }}
                onClick={(event) => {
                  setIsDeleteDialogOpen((prev) => !prev);
                  setIdPollClicked(props.data.id);
                  event.stopPropagation();
                }}
              >
                <DeleteIcon style={{ fontSize: 16 }} />
                <p>Delete</p>
              </div>
            ),
          }}
        ></StyledTable>
        {/* //Pagination */}
      </CardTable>
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

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDialogDelete}>
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
    </div>
  );
}
