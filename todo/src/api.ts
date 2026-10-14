import { supabase } from "./supabaseClient";
import type { Todo } from "./types";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Неизвестная ошибка Supabase";
}

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function addTodo(title: string): Promise<Todo> {
  try {
    const { data, error } = await supabase
      .from("todos")
      .insert({ title, is_done: false })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateTodoDone(
  id: string,
  isDone: boolean
): Promise<Todo> {
  try {
    const { data, error } = await supabase
      .from("todos")
      .update({ is_done: isDone })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteTodo(id: string): Promise<void> {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
