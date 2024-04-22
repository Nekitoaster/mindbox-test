import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { Provider } from "react-redux";
import { setupTestStore } from "./utils/setupTestStore";

const mockTasks = [
  { id: "1", body: "Test Task 1", checked: false },
  { id: "2", body: "Test Task 2", checked: true },
];

// Мокаем хук useGetTasksQuery так, чтобы он возвращал ожидаемое нами состояние
vi.mock("../src/stores/tasks/tasksApi", async (importOriginal) => {
  const actual = await importOriginal();
  if (!actual || typeof actual !== "object") {
    // Обработка случая, когда actual не объект
    return {
      useGetTasksQuery: () => ({
        data: mockTasks,
        isLoading: false,
        isError: false,
      }),
    };
  }
  return {
    ...actual,
    useGetTasksQuery: () => ({
      data: mockTasks,
      isLoading: false,
      isError: false,
    }),
  };
});

describe("App Component", () => {
  it("renders tasks data from store", async () => {
    const store = setupTestStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Проверить наличие заголовков задач на экране
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });
});
