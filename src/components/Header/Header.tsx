import { GrTask } from "react-icons/gr";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HeaderProps } from "./Header.props";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  useAddTaskMutation,
  useGetTasksQuery,
} from "../../stores/tasks/tasksApi";
import { TaskI } from "../../types";
import uuid4 from "uuid4";

function Header({ ...props }: HeaderProps): JSX.Element {
  const { refetch } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [toggle, setToggle] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (toggle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggle]);

  // Обработчик события отправки формы
  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault(); // Проверяем, не пусто ли поле ввода
    if (task.trim() != "") {
      const taskItem: TaskI = {
        id: uuid4(), // Создаем уникальный идентификатор для задачи
        body: task, // текст задачи
        checked: false, // при создании задача не выполнена
      };

      await addTask(taskItem); // Добавляем задачу
      setTask(""); // Очищаем поле ввода
      setToggle((prev) => !prev); // Закрываем форму
      refetch(); // Обновляем список задач
    } else {
      alert("an empty field!"); // Если поле пусто, выводим предупреждение
    }
  };

  // Рендер компонента
  return (
    <header {...props}>
      <button
        onClick={() => setToggle((prev) => !prev)} // Переключаем видимость формы
        className={toggle ? "hide-button" : ""}
      >
        Add Task
        <GrTask />
      </button>
      <form onSubmit={onSubmit} className={toggle ? "show-form" : ""}>
        <input
          ref={inputRef} // Ссылка на элемент для автофокуса
          value={task} // Привязка значения поля к состоянию
          onChange={(e) => setTask(e.target.value)} // Обновление состояния при изменении поля
          placeholder="Task"
        />
        <button type="submit">
          <IoIosAddCircleOutline />
        </button>
      </form>
    </header>
  );
}

export default Header;
