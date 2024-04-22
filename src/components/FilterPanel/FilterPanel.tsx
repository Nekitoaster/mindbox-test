import { FilterPanelProps } from "./FilterPanel.props";

function FilterPanel({filter, setFilter, ...props }: FilterPanelProps): JSX.Element {
  
  // Здесь мы просто управляем фильтром всех задач

  return (
    <ul {...props} className="filter-panel">
      <li
        onClick={() => setFilter("all")}
        className={
          "filter-panel__item" +
          (filter === "all" ? " filter-panel__item_active" : "")
        }
      >
        All
      </li>
      <li
        onClick={() => setFilter("progress")}
        className={
          "filter-panel__item" +
          (filter === "progress" ? " filter-panel__item_active" : "")
        }
      >
        In progress
      </li>
      <li
        onClick={() => setFilter("completed")}
        className={
          "filter-panel__item" +
          (filter === "completed" ? " filter-panel__item_active" : "")
        }
      >
        completed
      </li>
    </ul>
  );
}

export default FilterPanel;
