// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskResponse } from '../types/task.type';

@Injectable({
  providedIn: 'root',
})
export class TaskArrayService {
  private tasksSubject = new BehaviorSubject<TaskResponse[]>([]);
  tasks$ = this.tasksSubject.asObservable();

   updateTasks(tasks: TaskResponse[]) {
    this.tasksSubject.next(tasks);
  }

  addTask(newTask: TaskResponse) {
    const currentTasks = this.tasksSubject.value;
    this.updateTasks([...currentTasks, newTask]);
  }

  deleteTaskById(taskId: number) {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
    this.updateTasks(updatedTasks);
  }

  toggleTaskCompletion(taskId: number) {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, is_completed: !task.is_completed };
      }
      return task;
    });
    this.updateTasks(updatedTasks);
  }

  updateTasksFromServer(tasks: TaskResponse[]) {
    this.updateTasks(tasks);
  }
}
