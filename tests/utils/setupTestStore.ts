import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "../../src/stores/tasks/tasksApi";

export function setupTestStore() {
  return configureStore({
    reducer: {
      [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tasksApi.middleware),
  });
}
