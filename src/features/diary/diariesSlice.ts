import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

import http from "../../services/api";
import { User } from "../../interfaces/user.interface";
import { Diary } from "../../interfaces/diary.interface";
import { setUser } from "../auth/userSlice";
import { getDiaryDataFromUser } from "../../services/sweetAlertHelpers";
import { showAlert } from "../../services/sweetAlertHelpers/util";
import { deleteEntry } from "../entry/entriesSlice";

export const addNewDiary = createAsyncThunk(
  "diaries/addNewDiary",
  async (userId: string, { dispatch }) => {
    const newDiary = await getDiaryDataFromUser();
    return await http
      .post<Partial<Diary>, { diary: Diary; user: User }>("/diaries/", {
        ...newDiary,
        userId,
      })
      .then((res) => {
        dispatch(setUser(res.user));
        return res.diary;
      });
  }
);

export const editDiary = createAsyncThunk(
  "diaries/editDiaries",
  async (oldDiary: Diary) => {
    const newDiary = await getDiaryDataFromUser(oldDiary);
    return await http.put<Diary, Diary>(`/diaries/${oldDiary.id}`, newDiary);
  }
);

export const deleteDiary = createAsyncThunk(
  "diaries/deleteDiary",
  async (diaryId: string, { dispatch }) => {
    await http.delete<null, User>(`/diaries/${diaryId}`).then((user) => {
      dispatch(setUser(user));
    });
    return { diaryId };
  }
);

export const toggleDiaryType = createAsyncThunk(
  "diaries/toggleDiaryType",
  async (oldDiary: Diary) => {
    const updatedDiary: Diary = {
      ...oldDiary,
      type: oldDiary.type === "private" ? "public" : "private",
    };
    return await http.put<Diary, Diary>(
      `/diaries/${updatedDiary.id}`,
      updatedDiary
    );
  }
);

const diaries = createSlice({
  name: "diaries",
  initialState: [] as Diary[],
  reducers: {
    updateDiary(state, { payload: updatedDiary }: PayloadAction<Diary>) {
      const diaryIndex = state.findIndex(
        (diary) => diary.id === updatedDiary.id
      );
      if (diaryIndex !== -1) {
        state.splice(diaryIndex, 1, updatedDiary);
      }
    },
    setDiaries(state, { payload: diaries }: PayloadAction<Diary[]>) {
      state = diaries;
    },
  },
  extraReducers: {
    [addNewDiary.fulfilled.type]: (
      state,
      { payload }: PayloadAction<Diary>
    ) => {
      state.unshift(payload);
      Swal.fire({
        titleText: "All done!",
        confirmButtonText: "OK!",
      });
    },
    [addNewDiary.rejected.type]: () => {
      Swal.fire({
        titleText: "Cancelled",
      });
    },
    [editDiary.fulfilled.type]: (
      state,
      { payload: editedDiary }: PayloadAction<Diary>
    ) => {
      const diaryIndex = state.findIndex(
        (diary) => diary.id === editedDiary.id
      );
      if (diaryIndex !== -1) {
        state.splice(diaryIndex, 1, editedDiary);
        Swal.fire({
          titleText: "All done!",
          confirmButtonText: "OK!",
        });
      } else {
        Swal.fire({
          titleText: "Diary not found.",
        });
      }
    },
    [editDiary.rejected.type]: () => {
      Swal.fire({
        titleText: "Cancelled",
      });
    },
    [toggleDiaryType.fulfilled.type]: (
      state,
      { payload: newDiary }: PayloadAction<Diary>
    ) => {
      const diaryIndex = state.findIndex((diary) => diary.id === newDiary.id);
      if (diaryIndex !== -1) {
        state.splice(diaryIndex, 1, newDiary);
        showAlert("Saved!", "success");
      } else {
        showAlert("Failed!", "error");
      }
    },
    [deleteDiary.fulfilled.type]: (
      state,
      { payload }: PayloadAction<{ diaryId: string }>
    ) => {
      const { diaryId } = payload;
      const diaryIndex = state.findIndex((diary) => diary.id === diaryId);
      if (diaryIndex !== -1) {
        state.splice(diaryIndex, 1);
        showAlert("Diary deleted!", "success");
      } else {
        showAlert("Diary not found!", "error");
      }
    },
    [deleteEntry.rejected.type]: () => {
      showAlert("Failed!", "error");
    },
  },
});

export const { updateDiary, setDiaries } = diaries.actions;

export default diaries.reducer;
