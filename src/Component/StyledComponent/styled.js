import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
  button: {
    background: "#ffb000",
    border: 0,
    borderRadius: "0.25rem",
    boxShadow: "0 3px 3px 2px rgba(0,0,0,0.15)",
    color: "white",
    height: 48,
    padding: "0 30px",
    cursor: "pointer",
    "&:hover": {
      background: "#ffb000",
      opacity: 0.8,
      boxShadow: "0 3px 3px 2px rgba(0,0,0,0.15)",
    },
  },
});

export { useStyles };
