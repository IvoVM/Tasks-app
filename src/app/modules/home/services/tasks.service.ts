import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Categories, Task, TaskEdit, TaskPage, TaskResponse } from '../../../types/task.type';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = environment.apiUrl + '/Tasks';

  constructor(private http: HttpClient) {}

  getTasks(
    page_size: number,
    page_number: number,
    completed: boolean = false
  ): Observable<TaskPage> {
    const params = {
      page_size: page_size.toString(),
      page_number: page_number.toString(),
      completed: completed,
    };

    return this.http.get<TaskPage>(this.apiUrl, { params });
  }

  searchTasks(
    search_text: string,
    completed: boolean = false
  ): Observable<TaskPage> {
    const params = {
      page_size: 20,
      page_number: 1,
      completed,
      search_text,
    };

    return this.http.get<TaskPage>(this.apiUrl, { params });
  }

  getTaskById(id: string): Observable<TaskEdit> {
    return this.http.get<TaskEdit>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    let body = {
      id: id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      category_id: task.category_id,
    };
    return this.http.put<Task>(`${this.apiUrl}`, body);
  }

  updateTaskStatus(body: {
    id: string;
    is_completed: boolean;
  }): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}` + '/status', body);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${environment.apiUrl}` + '/Categories');
  }

  getIncompleteTasksLenght(): Observable<{ incomplete_task_count: number }> {
    return this.http.get<{ incomplete_task_count: number }>(
      `${this.apiUrl}` + '/incomplete-count'
    );
  }
}
