import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "100vh",
      alignItems: "center",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      maxWidth: "450px",
    },
    heading: {
      marginBottom: theme.spacing(5),
    },
    circular: {
      color: theme.palette.common.white,
    },
    link: {
      marginTop: theme.spacing(1),
      fontSize: "0.8rem",
      textAlign: "right",
      marginLeft: "auto",
    },
  })
);
