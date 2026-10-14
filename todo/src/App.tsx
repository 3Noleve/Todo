import { useEffect, useState } from "react";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { addTodo, deleteTodo, fetchTodos, updateTodoDone } from "./api";
import type { Todo } from "./types";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTodos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchTodos();

        if (isMounted) {
          setTodos(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Не удалось загрузить задачи"
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadTodos();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAdd = async (title: string) => {
    try {
      setError(null);

      const newTodo = await addTodo(title);

      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось добавить задачу"
      );
    }
  };

  const handleToggle = async (id: string, isDone: boolean) => {
    try {
      setError(null);

      const updatedTodo = await updateTodoDone(id, isDone);

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось обновить задачу"
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);

      await deleteTodo(id);

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось удалить задачу"
      );
    }
  };

  return (
    <main className="app">
      <h1>Todo</h1>

      <AddTodoForm onAdd={handleAdd} />

      {isLoading && <p>Загрузка…</p>}
      {error && <p className="error">Ошибка: {error}</p>}

      {!isLoading && (
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}

export default App;
