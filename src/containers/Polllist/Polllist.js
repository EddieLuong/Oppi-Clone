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
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledTable, CardTable } from "../../components/styles/styled";
import { useAppDispatch, useAppSelector } from "../../redux/consumeHook.ts";
import {
  polllistActions,
  deletePollRequest,
  fetchDataPolllist,
} from "./reducer";

function Polllist() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const polllistState = useAppSelector((state) => state.polllist);

  //input: data get from API, out put: data in rows of Polllist Table

  //Change page in Pagination: reset current page index and re-render polllist
  const handleChangePage = (page) => {
    dispatch(polllistActions.setCurrentPage(page));
    dispatch(polllistActions.setQuery((page - 1) * 10));
    // setCurrentPage(page);
    // setQuery((page - 1) * 10);
  };

  //Handle when click Cancel/click into space
  const handleCloseDialogDelete = () => {
    dispatch(polllistActions.toggleDeleteDialog());
    // setIsDeleteDialogOpen((prev) => !prev);
  };
  //Delete Poll
  const handleDeletePoll = () => {
    dispatch(deletePollRequest());
    handleCloseDialogDelete();
  };
  //Show poll detail when click on row
  const onRowClick = (event, rowData) => {
    event.stopPropagation();
    sessionStorage.setItem("idPollDetail", rowData.id);
    navigate("/polldetail");
  };

  useEffect(() => {
    dispatch(fetchDataPolllist());
  }, [dispatch]);
  return (
    <div className="pollist">
      {/* Log out Section */}
      <Header />
      {/* Polllist Table */}
      <CardTable>
        <StyledTable
          columns={columns}
          data={polllistState.dataPolllistTable}
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
                  dispatch(polllistActions.toggleDeleteDialog());
                  dispatch(polllistActions.setIdPollDelete(props.data.id));
                  // setIsDeleteDialogOpen((prev) => !prev);
                  // setIdPollClicked(props.data.id);
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
        page={polllistState.currentPage}
        onChange={(event, page) => handleChangePage(page)}
      />

      <Dialog
        className="dialogDelete"
        open={polllistState.isDeleteDialogOpen}
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
