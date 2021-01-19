import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useEntriesListStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    head: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(3),
    },
    backBtn: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginRight: theme.spacing(2),
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    newEntryBtn: {
      marginLeft: "auto",
    },
    entriesList: {
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
  })
);

export const useEntryTileStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    head: {
      display: "flex",
    },
    editBtn: {
      margin: theme.spacing(0, 1, 0, "auto"),
    },
  })
);
