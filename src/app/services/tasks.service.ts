import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Categories, Task, TaskPage, TaskResponse } from '../types/task.type';

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

  getTaskById(id: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  updateTaskStatus(body: {
    id: number;
    is_completed: boolean;
  }): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}` + '/status', body);
  }

  deleteTask(id: number): Observable<any> {
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
