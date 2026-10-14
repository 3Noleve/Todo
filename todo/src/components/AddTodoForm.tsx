import { useState, type FormEvent } from "react";

type AddTodoFormProps = {
  onAdd: (title: string) => Promise<void>;
};

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    await onAdd(trimmedTitle);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Новая задача"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}
