import { AiFillDelete } from "react-icons/ai";
import { ItemProps } from "./Item.props";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../stores/tasks/tasksApi";

function Item({ id, checked, body, ...props }: ItemProps): JSX.Element {
  const [updateTask] = useUpdateTaskMutation(); // Хук для обновления задачи
  const [deleteTask] = useDeleteTaskMutation(); // Хук для удаления задачи
  const { refetch } = useGetTasksQuery();

  const onChecked = () => {
    const newChecked = !checked; // Переключение состояния чекбокса
    const task = {
      id,
      body,
      checked: newChecked,
    };

    updateTask(task) // Вызов мутации для обновления задачи
      .unwrap()
      .then(() => refetch()); // Обновление списка задач после успешного обновления
  };

  const handleDeleteTask = () => {
    deleteTask(id) // Вызов мутации для удаления задачи
      .unwrap()
      .then(() => refetch()); // Обновление списка задач после успешного удаления
  };

  return (
    <div className={"item" + (checked ? " item_checked" : "")} {...props}>
      <h4 className="item__title">{body}</h4>
      <div className="item-complite">
        <label>Complited</label>
        <input
          checked={checked}
          onChange={onChecked}
          className="check"
          type="checkbox"
        />
      </div>
      <span onClick={handleDeleteTask} className="item__del">
        <AiFillDelete />
      </span>
    </div>
  );
}

export default Item;
