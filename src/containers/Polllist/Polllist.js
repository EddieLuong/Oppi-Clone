import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Pagination,
} from "@mui/material";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledTable,
  CardTable,
  StyledTableContainer,
  StyledTableRow,
  StatusStyledTableCell,
} from "../../components/styles/styled";
import { useSelector, useDispatch } from "react-redux";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import {
  setQuery,
  deletePollAction,
  fetchPolllistRequest,
  setPollId,
} from "./reducer";

function Polllist() {
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
    dispatch(deletePollAction());
    setIsDeleteDialogOpen(false);
  };
  //Show poll detail when click on row
  const onRowClick = (row) => {
    if (row.status !== "ended") {
      dispatch(setPollId(row.id));
      navigate(`/poll-detail/${row.id}`);
    }
  };

  useEffect(() => {
    dispatch(fetchPolllistRequest());
  }, [polllistState.query]);

  return (
    <div className="pollist">
      {/* Header Section */}
      <Header />
      {/* Polllist Table */}
      <CardTable>
        <StyledTableContainer component={Paper}>
          <StyledTable aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Poll Name</TableCell>
                <TableCell>Poll Question</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">End Date</TableCell>
                <TableCell align="center">Participants</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {polllistState.dataPolllistTable.map((row, index) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => onRowClick(row)}
                  index={index}
                  status={row.status}
                >
                  <TableCell style={{ width: "15%" }}>{row.title}</TableCell>
                  <TableCell style={{ width: "30%" }}>{row.question}</TableCell>
                  <TableCell align="center">{row.startDate}</TableCell>
                  <TableCell align="center">{row.endDate}</TableCell>
                  <TableCell align="center">{row.participants}</TableCell>
                  <StatusStyledTableCell status={row.status} align="center">
                    <div className="statusCell">{row.status.toUpperCase()}</div>
                  </StatusStyledTableCell>
                  <TableCell align="center">
                    <div
                      onClick={(event) => {
                        setIsDeleteDialogOpen(true);
                        dispatch(setPollId(row.id));
                        event.stopPropagation();
                      }}
                      className="action__Delete"
                    >
                      <DeleteIcon className="action__Delete__DeleteIcon" />
                      <p className="action__Delete__text">Delete</p>
                    </div>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      </CardTable>
      <Pagination
        className="pagination"
        count={polllistState.pageCount}
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
          <img
            className="imgDeletePoll"
            src="/Oppi-Clone/img/black_man_meme.png"
            alt=""
          />
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
