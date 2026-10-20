# Список задач

Приложение для списка задач на Vite + Supabase.

## Запуск локально

### Чек-лист

- [ ] Клонировать репозиторий
- [ ] Установить зависимости
- [ ] Создать проект в Supabase
- [ ] Выполнить SQL
- [ ] Получить URL и ключ
- [ ] Создать `.env`
- [ ] Запустить проект

---

### 1. Клонировать репозиторий

```bash
git clone https://github.com/ВАШ_ЛОГИН/Todo.git
cd todo
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Создать проект в Supabase

1. Создайте новый проект на [supabase.com](https://supabase.com).
2. Откройте **SQL Editor** и выполните:

```sql
create table todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  is_done boolean not null default false,
  created_at timestamp default now()
);

alter table todos enable row level security;

create policy "todos: public access" on todos
  for all using (true) with check (true);

grant usage on schema public to anon, authenticated, service_role;
grant all privileges on table public.todos
  to anon, authenticated, service_role;
grant all privileges on all sequences in schema public
  to anon, authenticated, service_role;

alter default privileges in schema public
  grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public
  grant all on sequences to anon, authenticated, service_role;
```

> **Важно:** блок `GRANT` нужен на новых проектах Supabase.  
> Без него можно получить ошибку `permission denied for table todos`.

### 4. Получить URL и ключ

Откройте:

**Project Settings → API**

Нужны:

- **Project URL** — например `https://xxxxxxxxxxxx.supabase.co`
- **Publishable key**  
  или **anon public key** во вкладке **Legacy API keys**

### 5. Создать `.env`

```bash
cp .env.example .env
```

Заполните `.env` **без кавычек и пробелов**:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxxx
```

> `.env` не попадает в репозиторий — файл указан в `.gitignore`.

### 6. Запустить проект

```bash
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173).

---

## Скрипты

| Команда           | Описание                       |
| ----------------- | ------------------------------ |
| `npm run dev`     | запуск dev-сервера Vite        |
| `npm run build`   | сборка (`tsc + vite build`)    |
| `npm run preview` | предпросмотр production-сборки |

---

## Переменные окружения

| Переменная               | Описание                            |
| ------------------------ | ----------------------------------- |
| `VITE_SUPABASE_URL`      | URL проекта Supabase                |
| `VITE_SUPABASE_ANON_KEY` | Публичный ключ (publishable / anon) |

> Обе переменные должны начинаться с `VITE_`, иначе Vite не отдаст их во фронтенд.
