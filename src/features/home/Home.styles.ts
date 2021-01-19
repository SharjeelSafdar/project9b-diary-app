import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bg: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    loggedOutBtns: {
      display: "flex",
      "& button": {
        margin: theme.spacing(5, 2),
        padding: theme.spacing(1, 4),
      },
    },
  })
);
