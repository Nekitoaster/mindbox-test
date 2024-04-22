import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskI } from "../../types";

interface TaskAdd {
  body: string;
  checked: boolean;
}

interface TaskUpdate extends TaskAdd {
  id: string;
}

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003/",
  }),
  tagTypes: ['Task'], // Поддержка тэгов для автоматического инвалидирования кэша
  endpoints: (build) => ({
    getTasks: build.query<TaskI[], void>({
      query: () => "tasks",
      providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Task' as const, id })), 'Task'] : ['Task'], // Для автоматического инвалидирования
    }),
    addTask: build.mutation<TaskI, TaskAdd>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }], // После добавления задачи инвалидирует список
    }),
    updateTask: build.mutation<TaskI, TaskUpdate>({
      query: ({ id, ...rest }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }], // После обновления задачи инвалидирует список
    }),
    deleteTask: build.mutation<{id: string }, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }], // После удаления задачи инвалидирует список
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;
