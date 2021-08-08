import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGroup = createAsyncThunk("group/get", async (id) => {
  const groups = await axios.get("/api/group/usergroup/" + id);
  return groups.data.group;
});

export const deleteGroup = createAsyncThunk("group/delete", async (id) => {
  await axios.delete("/api/group/" + id);
  return id;
});

const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
  },
  reducers: {
    addTodoForGroup: (state, action) => {
      let temp = state.groups.find((f) => {
        return f._id === action.payload.group._id;
      });
      temp.todos.push(action.payload);
    },
    deleteTodoInGrup: (state, { payload }) => {
      let g = state.groups.find((f) => f._id === payload.group);
      g.todos = g.todos.filter((f) => f._id !== payload.todo);
    },
    changeTodo: (state, { payload }) => {
      let g = state.groups.find((f) => f._id === payload.group);
      let todo = g.todos.find((f) => f._id === payload.todo);
      todo.status = !todo.status;
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    addGroupMember: (state, action) => {
      const g = state.groups.find((f) => f._id === action.payload.id);
      g.members = action.payload.members;
    },
  },
  extraReducers: {
    [getGroup.fulfilled]: (state, action) => {
      state.groups = action.payload;
    },
    [deleteGroup.fulfilled]: (state, action) => {
      state.groups = state.groups.filter((f) => f._id !== action.payload);
    },
  },
});

export const {
  addTodoForGroup,
  deleteTodoInGrup,
  addGroup,
  addGroupMember,
  changeTodo,
} = groupSlice.actions;

export const groupState = (state) => state.group;

export default groupSlice.reducer;
