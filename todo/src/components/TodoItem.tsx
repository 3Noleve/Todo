import type { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string, isDone: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.is_done ? "completed" : ""}`}>
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.is_done}
          onChange={(event) => {
            void onToggle(todo.id, event.target.checked);
          }}
        />
        <span>{todo.title}</span>
      </label>

      <button
        type="button"
        className="delete-button"
        onClick={() => {
          void onDelete(todo.id);
        }}
        aria-label={`Удалить задачу: ${todo.title}`}
      >
        Удалить
      </button>
    </li>
  );
}
