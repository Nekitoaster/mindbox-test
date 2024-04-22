import { describe, expect, it, vi } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../src/components/Header/Header";
import { Provider } from "react-redux";
import { TaskI } from "../src/types";
import { setupTestStore } from "./utils/setupTestStore";

// Эмулируем функции API
vi.mock("../../stores/tasks/tasksApi", () => ({
  useAddTaskMutation: () => [(task: TaskI) => Promise.resolve(task), {}],
  useGetTasksQuery: () => ({ refetch: vi.fn() }),
}));

describe("Header component", () => {
  it("submits form data successfully", async () => {
    const store = setupTestStore(); // Инстанс Redux Store
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Эмуляция пользовательского ввода
    fireEvent.change(screen.getByPlaceholderText(/Task/i), {
      target: { value: "New Task" },
    });
    // Эмуляция отправки формы
    fireEvent.submit(screen.getByRole("button", { name: "" }));

    await waitFor(() => {
      // После отправки формы поле ввода должно быть очищено
      expect(screen.getByPlaceholderText(/Task/i)).toHaveValue("");
    });
  });
});
