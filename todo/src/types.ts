export type Todo = {
  id: string;
  title: string;
  is_done: boolean;
  created_at: string | null;
};

export type Database = {
  public: {
    Tables: {
      todos: {
        Row: Todo;
        Insert: {
          id?: string;
          title: string;
          is_done?: boolean;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          is_done?: boolean;
          created_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
