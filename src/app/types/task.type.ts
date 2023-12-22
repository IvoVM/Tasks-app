export interface Task {
  title: string;
  description: string;
  priority: number;
  category_id: number;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: number;
  is_completed: boolean;
  last_update_date: string;
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
