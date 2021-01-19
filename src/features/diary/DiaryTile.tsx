import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Typography, IconButton } from "@material-ui/core";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaLockOpen, FaLock } from "react-icons/fa";

import { Diary } from "../../interfaces/diary.interface";
import { editDiary, deleteDiary, toggleDiaryType } from "./diariesSlice";
import { useAppDispatch } from "../../store";
import { useDiaryTileStyles } from "./styles";

interface DiaryTileProps {
  diary: Diary;
}

const DiaryTile: FC<DiaryTileProps> = ({ diary }) => {
  const classes = useDiaryTileStyles();
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();

  const totalEntries = diary?.entryIds?.length;

  return (
    <Paper elevation={7} className={classes.container}>
      <div className={classes.head}>
        <Typography variant="h5" component="h4">
          {diary.title}
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => dispatch(toggleDiaryType(diary))}
          title={`This diary is ${diary.type}. Click to make it ${
            diary.type === "public" ? "private" : "public"
          }.`}
          className={classes.diaryType}
        >
          {diary.type === "public" ? <FaLockOpen /> : <FaLock />}
        </IconButton>
        <IconButton
          onClick={() => dispatch(editDiary(diary))}
          edge="start"
          color="inherit"
          title="Edit diary title."
          className={classes.editBtn}
        >
          <MdEdit />
        </IconButton>
        <IconButton
          onClick={() => dispatch(deleteDiary(diary.id))}
          edge="start"
          color="inherit"
          title="Delete diary and its entries."
        >
          <AiTwotoneDelete />
        </IconButton>
      </div>
      <Typography variant="subtitle1" color="textSecondary">
        {totalEntries ?? "0"} saved entries
      </Typography>

      <Button
        onClick={() => navigateTo(`/diaries/${diary.id}`)}
        variant="contained"
        color="primary"
        fullWidth
      >
        View all &rarr;
      </Button>
    </Paper>
  );
};

export default DiaryTile;
