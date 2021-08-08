import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
  group: false,
  members: false,
};

const themaSlice = createSlice({
  name: "thema",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload ? action.payload : !state.modal;
    },
    setGroup: (state, action) => {
      state.group = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
  },
});

export const { setModal, setGroup, setMembers } = themaSlice.actions;

export const themaState = (state) => state.thema;

export default themaSlice.reducer;
