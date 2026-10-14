import { useActionState, useRef } from "react";

type AddTodoFormProps = {
  onAdd: (title: string) => Promise<boolean>;
};

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [error, submitAction, isPending] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      const title = String(formData.get("title") ?? "").trim();

      if (!title) {
        return "Введите название задачи";
      }

      try {
        const success = await onAdd(title);

        if (!success) {
          return "Не удалось добавить задачу";
        }

        formRef.current?.reset();
        return null;
      } catch {
        return "Произошла ошибка. Попробуйте ещё раз.";
      }
    },
    null
  );

  return (
    <form ref={formRef} className="add-form" action={submitAction}>
      <input
        type="text"
        name="title"
        placeholder="Например, посмотреть фильм"
        aria-label="Название новой задачи"
        disabled={isPending}
        required
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Добавляю…" : "Добавить"}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
