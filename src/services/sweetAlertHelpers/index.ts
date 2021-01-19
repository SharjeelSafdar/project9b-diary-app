import Swal, { SweetAlertResult } from "sweetalert2";

import { Diary } from "../../interfaces/diary.interface";
import { Entry } from "../../interfaces/entry.interface";

export const getDiaryDataFromUser = async (
  currentDiaryData: Partial<Diary> = {
    title: "",
    type: "private",
  }
) => {
  const userResponse = (await Swal.mixin({
    input: "text",
    confirmButtonText: "Next &rarr;",
    showCancelButton: true,
    progressSteps: ["1", "2"],
  }).queue([
    {
      titleText: "Diary Title",
      input: "text",
      inputValue: currentDiaryData.title,
    },
    {
      titleText: "Private or public diary?",
      input: "radio",
      inputOptions: {
        private: "Private",
        public: "Public",
      },
      inputValue: currentDiaryData.type,
    },
  ])) as SweetAlertResult<string[]>;

  if (userResponse.value) {
    return {
      ...currentDiaryData,
      title: userResponse.value[0],
      type: userResponse.value[1],
    } as Partial<Diary>;
  } else {
    throw Error("Bad data from user.");
  }
};

export const getEntryDataFromUser = async (
  currentEntryData: Partial<Entry> = {
    title: "",
    content: "",
  }
) => {
  const userResponse = (await Swal.mixin({
    input: "text",
    confirmButtonText: "Next &rarr;",
    showCancelButton: true,
    progressSteps: ["1", "2"],
  }).queue([
    {
      titleText: "Entry Title",
      input: "text",
      inputValue: currentEntryData.title,
    },
    {
      titleText: "Entry Content",
      input: "textarea",
      inputValue: currentEntryData.content,
    },
  ])) as SweetAlertResult<string[]>;

  if (userResponse.value) {
    return {
      ...currentEntryData,
      title: userResponse.value[0],
      content: userResponse.value[1],
    } as Partial<Entry>;
  } else {
    throw Error("Bad data from user.");
  }
};
