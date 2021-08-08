import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getTodos = createAsyncThunk("todos/get", async (id) => {
  const todos = await axios("/api/todo/userstodo/" + id);
  return todos.data.todos;
});

export const changeTodosStatus = createAsyncThunk(
  "todos/changeStatus",
  async (id) => {
    await axios("/api/todo/changestatus?id=" + id);

    return id;
  }
);

export const newTodo = createAsyncThunk("new/todo", async (data) => {
  const todo = await axios.post("/api/todo/create", data);
  console.log(todo);
  return todo.data.newTodo;
});
export const deleteTodo = createAsyncThunk("delete/todo", async (id) => {
  await axios.delete("/api/todo/" + id);
  return id;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: null,
    isLoading: true,
  },
  extraReducers: {
    [getTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    },
    [changeTodosStatus.fulfilled]: (state, action) => {
      let temp = state.todos.find((f) => f._id === action.payload);
      temp.donedate = new Date(Date.now());
      temp.status = !temp.status;
    },
    [newTodo.fulfilled]: (state, action) => {
      if (action.payload.adding === action.payload.user._id) {
        state.todos = state.todos === null ? [] : state.todos;
        state.todos.push(action.payload);
      }
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.todos = state.todos.filter((f) => f._id !== action.payload);
    },
  },
});

export const {} = todoSlice.actions;

export const todoState = (state) => state.todo;

export default todoSlice.reducer;
