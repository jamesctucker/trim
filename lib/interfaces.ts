export interface Todo {
  id?: number;
  user_id?: string;
  task: string;
  description?: string;
  is_complete?: boolean;
  inserted_at?: string;
}
