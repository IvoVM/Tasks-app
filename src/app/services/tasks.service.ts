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
    completed: boolean
  ): Observable<TaskPage> {
    const params = {
      page_size: page_size.toString(),
      page_number: page_number.toString(),
      completed: completed.toString(),
    };

    return this.http.get<TaskPage>(this.apiUrl, { params });
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${environment.apiUrl}` + '/Categories');
  }
}
