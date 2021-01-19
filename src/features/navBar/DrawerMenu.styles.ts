import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      maxWidth: "90vw",
    },
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      margin: theme.spacing(0, "auto", 2, "auto"),
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    topBtn: {
      margin: theme.spacing(2, 0),
    },
  })
);
