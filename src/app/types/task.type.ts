export interface Task {
  title: string;
  description: string;
  priority: number;
  category_id: number;
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: number;
  is_completed: boolean;
  last_update_date: string;
  creation_date?: string;
}

export interface TaskEdit extends TaskResponse {
  category_id: number;
}
export interface TaskPage {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  items: TaskResponse[];
}

export interface Categories {
  id: number;
  name: string;
}
