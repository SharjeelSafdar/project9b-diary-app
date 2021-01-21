import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import dayjs from "dayjs";

import http from "../../services/api";
import DiaryTile from "./DiaryTile";
import { Diary } from "../../interfaces/diary.interface";
import { RootState } from "../../store/rootReducer";
import { addNewDiary, setDiaries } from "./diariesSlice";
import { useAppDispatch } from "../../store";
import { useDiariesStyles } from "./styles";

const Diaries: FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const diaries = useSelector((state: RootState) => state.diaries).filter(
    (diary) => diary.userId === user?.id
  );
  const classes = useDiariesStyles();

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        http.get<null, Diary[]>(`diaries/${user.id}`).then((data) => {
          if (data && data.length > 0) {
            const sortedByUpdatedAt = data.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setDiaries(sortedByUpdatedAt));
          }
        });
      }
    };

    fetchDiaries();
  }, [dispatch, user]);

  if (user === null) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.head}>
        <Typography variant="h5">My Diaries</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus size="1rem" />}
          onClick={() => dispatch(addNewDiary(user?.id))}
        >
          Create New Diary
        </Button>
      </div>
      {diaries.length > 0 ? (
        diaries.map((diary) => (
          <DiaryTile key={diary.updatedAt} diary={diary} />
        ))
      ) : (
        <Typography variant="body1">
          There are currently no diaries to show.
        </Typography>
      )}
    </div>
  );
};

export default Diaries;
