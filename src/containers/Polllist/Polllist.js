import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Pagination,
} from "@mui/material";
import Header from "../../components/Header";
import { columns } from "../../components/Utils";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledTable, CardTable } from "../../components/styles/styled";
import { useSelector, useDispatch } from "react-redux";
import {
  setIdPollDelete,
  setQuery,
  deletePollRequest,
  fetchDataPolllist,
  setIdPollDetail,
} from "./reducer";

function Polllist() {
  const accessToken = sessionStorage.getItem("AdminAccessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const polllistState = useSelector((state) => state.polllist);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  //Change page in Pagination: reset current page index and re-render polllist
  const handleChangePage = (page) => {
    setCurrentPage(page);
    dispatch(setQuery((page - 1) * 10));
  };
  //Handle when click Cancel/click into space
  const handleCloseDialogDelete = () => {
    setIsDeleteDialogOpen(false);
  };
  //Delete Poll
  const handleDeletePoll = () => {
    dispatch(deletePollRequest(accessToken));
    dispatch(fetchDataPolllist(accessToken));
  };
  //Show poll detail when click on row
  const onRowClick = (event, rowData) => {
    event.stopPropagation();
    async function setId() {
      dispatch(setIdPollDetail(rowData.id));
    }
    setId().then(() => {
      navigate("/polldetail");
    });
  };

  //map data to array before set to data Material prop
  const editable = polllistState.dataPolllistTable.map((row) => ({ ...row }));

  useEffect(() => {
    dispatch(fetchDataPolllist(accessToken));
  }, [
    dispatch,
    accessToken,
    polllistState.query,
    polllistState.dataPolllistTable,
  ]);
  return (
    <div className="pollist">
      {/* Log out Section */}
      <Header />
      {/* Polllist Table */}
      <CardTable>
        <StyledTable
          columns={columns}
          data={editable}
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
                padding: "0 10px",
              };
              if (row.tableData.id % 2 !== 0) {
                styles.backgroundColor = "#fff";
              } else styles.backgroundColor = "#ecf5fd";
              return styles;
            },
          }}
          style={{ boxShadow: "none", marginTop: 50 }}
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
                className="boxAction"
                style={{
                  display: "inline-flex",
                  width: 115,
                  marginTop: "16px",
                  marginRight: 10,
                  justifyContent: "center",
                  border: "0.8px solid #E1E1e1",
                  padding: "3px 0",
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  boxShadow: "0 2px 4px rgb(0 0 0 / 20%)",
                }}
                onClick={(event) => {
                  setIsDeleteDialogOpen(true);
                  dispatch(setIdPollDelete(props.data.id));
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
        className="pagination"
        count={polllistState.countPage}
        color="primary"
        variant="outlined"
        size="large"
        shape="rounded"
        boundaryCount={3}
        siblingCount={2}
        page={currentPage}
        onChange={(event, page) => handleChangePage(page)}
      />

      <Dialog
        className="dialogDelete"
        open={isDeleteDialogOpen}
        onClose={handleCloseDialogDelete}
      >
        <DialogContent>
          <img className="imgDeletePoll" src="/img/black_man_meme.png" alt="" />
          <DialogContentText
            id="alert-dialog-description "
            className="align-center"
          >
            Are you sure you would like to delete this poll?
            <br />
            Once deleted, it cannot be retrieved.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialogActionsDelete">
          <Button className="keepPollBtn" onClick={handleCloseDialogDelete}>
            Keep Poll
          </Button>
          <Button id="deletePollBtn" onClick={handleDeletePoll}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default React.memo(Polllist);
