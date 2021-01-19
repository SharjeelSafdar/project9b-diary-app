import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
      width: "fit-content",
    },
    title: {
      flexGrow: 1,
      cursor: "pointer",
    },
    logInBtn: {
      width: "fit-content",
    },
  })
);
