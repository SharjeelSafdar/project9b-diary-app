import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { IconButton, Typography, Button } from "@material-ui/core";
import { FaPlus } from "react-icons/fa";

import { EntryTile } from "./EntryTile";
import { RootState } from "../../store/rootReducer";
import { addNewEntry, getEntries } from "./entriesSlice";
import { useAppDispatch } from "../../store";
import { useEntriesListStyles } from "./styles";

const EntriesList: FC = () => {
  const classes = useEntriesListStyles();
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const { diaryId } = useParams();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const entries = useSelector((state: RootState) => state.entries).filter(
    (entry) => entry.diaryId === diaryId
  );
  const diary = useSelector((state: RootState) =>
    state.diaries.find((diary) => diary.id === diaryId)
  );

  useEffect(() => {
    dispatch(getEntries(diaryId));
  }, [diaryId, dispatch]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.head}>
        <IconButton
          onClick={() => navigateTo("/diaries")}
          title="Back to diaries"
          className={classes.backBtn}
        >
          &larr;
        </IconButton>
        <Typography variant="h4" component="h3">
          {diary && diary.title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus size="1rem" />}
          className={classes.newEntryBtn}
          onClick={() => dispatch(addNewEntry(diaryId))}
        >
          Create New Entry
        </Button>
      </div>
      {entries.length > 0 ? (
        <ul className={classes.entriesList}>
          {entries.map((entry) => (
            <EntryTile key={entry.updatedAt} entry={entry} />
          ))}
        </ul>
      ) : (
        <Typography variant="body1">
          There are currently no entries in this diary.
        </Typography>
      )}
    </div>
  );
};

export default EntriesList;
