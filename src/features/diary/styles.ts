import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useDiariesStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    head: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing(3),
    },
  })
);

export const useDiaryTileStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    head: {
      display: "flex",
    },
    diaryTitleEdit: {
      height: "2rem",
    },
    diaryType: {
      margin: theme.spacing(0, 0, 0, "auto"),
    },
    editBtn: {
      margin: theme.spacing(0, 1),
    },
  })
);
