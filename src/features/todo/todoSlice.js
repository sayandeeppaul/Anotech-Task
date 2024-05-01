import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    completedTasks: [],
  },
  reducers: {
    addTodo: (state, action) => {
      const { title, description, priority, createdAt } = action.payload;
      state.todos.push({ title, description, priority, createdAt });
    },
    removeTodo: (state, action) => {
      state.todos.splice(action.payload, 1);
    },
    updateTodo: (state, action) => {
      state.todos[action.payload.index] = action.payload.updatedTodo;
    },
    addCompletedTask: (state, action) => {
      state.completedTasks.push(action.payload);
    },
    filterTodos: (state, action) => {
      const priority = action.payload;
      state.filteredTodos = state.todos.filter(
        (todo) => todo.priority === priority
      );
    },
    removeCompletedTask(state, action) {
      state.completedTasks.splice(action.payload, 1);
    },
  },
});

export const {
  addTodo,
  removeTodo,
  updateTodo,
  addCompletedTask,
  filterTodos,
  removeCompletedTask,
} = todoSlice.actions;
export default todoSlice.reducer;
