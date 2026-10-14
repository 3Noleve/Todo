import { useEffect, useState } from "react";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { getTodos, addTodo, updateTodoStatus, deleteTodo } from "./api";
import type { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch {
        setError("Не удалось загрузить задачи. Попробуйте обновить страницу.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadTodos();
  }, []);

  async function handleAddTodo(title: string): Promise<boolean> {
    try {
      const newTodo = await addTodo(title);
      setTodos((currentTodos) => [newTodo, ...currentTodos]);
      setError(null);
      return true;
    } catch {
      setError("Не удалось добавить задачу.");
      return false;
    }
  }

  async function handleToggleTodo(id: string, isDone: boolean): Promise<void> {
    try {
      const updatedTodo = await updateTodoStatus(id, isDone);

      setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );

      setError(null);
    } catch {
      setError("Не удалось изменить статус задачи.");
    }
  }

  async function handleDeleteTodo(id: string): Promise<void> {
    try {
      await deleteTodo(id);

      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));

      setError(null);
    } catch {
      setError("Не удалось удалить задачу.");
    }
  }

  return (
    <main className="app">
      <h1>Мои задачи</h1>

      <AddTodoForm onAdd={handleAddTodo} />

      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}

      {isLoading ? (
        <p>Загрузка…</p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      )}
    </main>
  );
}

export default App;
