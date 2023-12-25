// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskResponse } from '../../types/task.type';

@Injectable({
  providedIn: 'root',
})
export class TasksListService {

  private tasksSubject = new BehaviorSubject<TaskResponse[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  updateTasks(tasks: TaskResponse[]) {
    this.tasksSubject.next(tasks);
  }

  pushTasks(newTasks: TaskResponse[]): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = [...currentTasks, ...newTasks];
    this.updateTasks(updatedTasks);
  }

  deleteTaskById(taskId: string) {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
    this.updateTasks(updatedTasks);
  }

  toggleTaskCompletion(taskId: string) {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, is_completed: !task.is_completed };
      }
      return task;
    });
    this.updateTasks(updatedTasks);
  }
}
