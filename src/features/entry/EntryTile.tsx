import React, { FC } from "react";
import { Paper, Typography, IconButton } from "@material-ui/core";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";

import { Entry } from "../../interfaces/entry.interface";
import { useAppDispatch } from "../../store";
import { editEntry, deleteEntry } from "./entriesSlice";
import { useEntryTileStyles } from "./styles";

interface EntryTileProps {
  entry: Entry;
}

export const EntryTile: FC<EntryTileProps> = ({ entry }) => {
  const classes = useEntryTileStyles();
  const dispatch = useAppDispatch();

  return (
    <Paper elevation={7} className={classes.container}>
      <div className={classes.head}>
        <Typography variant="h5" component="h4">
          {entry.title}
        </Typography>
        <IconButton
          onClick={() => dispatch(editEntry(entry))}
          edge="start"
          color="inherit"
          title="Edit entry"
          className={classes.editBtn}
        >
          <MdEdit />
        </IconButton>
        <IconButton
          onClick={() => dispatch(deleteEntry(entry.id))}
          edge="start"
          color="inherit"
          title="Delete entry"
        >
          <AiTwotoneDelete />
        </IconButton>
      </div>
      <Typography variant="body1">{entry.content}</Typography>
    </Paper>
  );
};
