import { useEffect, useState } from "react";

import FilterPanel from "./components/FilterPanel/FilterPanel";
import Header from "./components/Header/Header";
import Item from "./components/Item/Item";
import Wrapper from "./components/Wrapper/Wrapper";

import { useGetTasksQuery } from "./stores/tasks/tasksApi";

import { FilterT, TaskI } from "./types";

import Loader from "./components/Loader/Loader";
import Error from "./components/Error/Error";
import Empty from "./components/Empty/Empty";

function App() {
  const { data, isLoading, isError } = useGetTasksQuery();
  // Состояние для управления фильтрацией задач
  const [filter, setFilter] = useState<FilterT>("all");
  // Состояние для хранения отфильтрованных данных задач
  const [filteredData, setFilteredData] = useState<TaskI[]>([]);

  // Эффект для обработки фильтрации данных задач
  useEffect(() => {
    // Проверка на отсутствие загрузки и наличие данных
    if (!isLoading && data) {
      let newData: TaskI[] = []; // Временный массив для обновленных данных

      // Фильтрация данных на основе выбранного фильтра
      switch (filter) {
        case "all":
          newData = data; // Показать все задачи
          break;
        case "progress":
          newData = data.filter((item) => item.checked === false); // Задачи в процессе
          break;
        case "completed":
          newData = data.filter((item) => item.checked === true); // Завершенные задачи
          break;
        default:
          newData = data; // Фолбек для непредвиденных значений фильтра
      }

      // Обновление состояния отфильтрованных данных
      setFilteredData(newData);
    }
  }, [filter, data, isLoading]);

  return (
    <>
      <Header />
      <Wrapper>
        {/* Компонент для управления фильтрацией данных */}
        <FilterPanel filter={filter} setFilter={setFilter} />
        {/* Условное отображение контента: данные отобразятся, если нет загрузки и ошибки */}
        {!isLoading && !isError && (
          <div className="items-wrapper">
            {/* Отображение отфильтрованных данных задач */}
            {filteredData.map((task) => (
              <Item
                key={task.id}
                id={task.id}
                body={task.body}
                checked={task.checked}
              />
            ))}
          </div>
        )}
        {isLoading && <Loader />}{" "}
        {/* Отображение загрузчика при загрузке данных */}
        {isError && <Error />}{" "}
        {/* Отображение ошибки в случае её возникновения */}
        {!isError && !isLoading && filteredData.length === 0 && <Empty />}
      </Wrapper>
    </>
  );
}

export default App;
