import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import dayjs from "dayjs";

import { Diary } from "../../interfaces/diary.interface";
import { Entry } from "../../interfaces/entry.interface";
import { getEntryDataFromUser } from "../../services/sweetAlertHelpers";
import http from "../../services/api";
import { updateDiary } from "../diary/diariesSlice";
import { showAlert } from "../../services/sweetAlertHelpers/util";

export const getEntries = createAsyncThunk(
  "entries/getEntries",
  async (diaryId: string) => {
    return await http
      .get<null, { entries: Entry[] }>(`/diaries/entries/${diaryId}`)
      .then(({ entries }) => {
        const sortByLastUpdated = entries.sort(
          (a, b) => dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
        );
        return sortByLastUpdated;
      });
  }
);

export const addNewEntry = createAsyncThunk(
  "entries/addNewEntry",
  async (diaryId: string, { dispatch }) => {
    const newEntry = await getEntryDataFromUser();
    return await http
      .post<Partial<Entry>, { updatedDiary: Diary; newEntry: Entry }>(
        `/diaries/entry/${diaryId}`,
        newEntry
      )
      .then(({ updatedDiary, newEntry }) => {
        dispatch(updateDiary(updatedDiary));
        return newEntry;
      });
  }
);

export const editEntry = createAsyncThunk(
  "entries/editEntry",
  async (oldEntry: Entry) => {
    const editedEntry = await getEntryDataFromUser(oldEntry);
    return await http.put<Entry, Entry>(
      `/diaries/entry/${oldEntry.id}`,
      editedEntry
    );
  }
);

export const deleteEntry = createAsyncThunk(
  "entries/deleteEntry",
  async (entryId: string, { dispatch }) => {
    await http
      .delete<null, Diary>(`/entries/${entryId}`)
      .then((updatedDiary) => {
        dispatch(updateDiary(updatedDiary));
      });
    return entryId;
  }
);

const entries = createSlice({
  name: "entries",
  initialState: [] as Entry[],
  reducers: {},
  extraReducers: {
    [getEntries.fulfilled.type]: (
      state,
      { payload }: PayloadAction<Entry[]>
    ) => {
      state = payload;
    },
    [addNewEntry.fulfilled.type]: (
      state,
      { payload: newEntry }: PayloadAction<Entry>
    ) => {
      state.unshift(newEntry);
      Swal.fire({
        titleText: "All done!",
        confirmButtonText: "OK!",
      });
    },
    [addNewEntry.rejected.type]: () => {
      Swal.fire({
        titleText: "Cancelled",
      });
    },
    [editEntry.fulfilled.type]: (
      state,
      { payload: editedEntry }: PayloadAction<Entry>
    ) => {
      const entryIndex = state.findIndex(
        (entry) => entry.id === editedEntry.id
      );
      if (entryIndex !== -1) {
        state.splice(entryIndex, 1, editedEntry);
        Swal.fire({
          titleText: "All done!",
          confirmButtonText: "OK!",
        });
      } else {
        Swal.fire({
          titleText: "Entry not found.",
        });
      }
    },
    [editEntry.rejected.type]: () => {
      Swal.fire({
        titleText: "Cancelled",
      });
    },
    [deleteEntry.fulfilled.type]: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      const entryIndex = state.findIndex((entry) => entry.id === payload);
      if (entryIndex !== -1) {
        state.splice(entryIndex, 1);
        showAlert("Entry deleted!", "success");
      } else {
        showAlert("Entry not found!", "error");
      }
    },
    [deleteEntry.rejected.type]: () => {
      showAlert("Failed!", "error");
    },
  },
});

// export const {  } = entries.actions;

export default entries.reducer;
