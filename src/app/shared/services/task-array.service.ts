// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskResponse } from '../../types/task.type';

@Injectable({
  providedIn: 'root',
})
export class TaskArrayService {
  //Tasks views
  private tasksSubject = new BehaviorSubject<TaskResponse[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  //Header icon
  private incompletedTaskLengthSubject = new BehaviorSubject<number>(0);
  incompletedTasksLenght$ = this.incompletedTaskLengthSubject.asObservable();

  // header icon
  setFirstValue(value: number) {
    this.incompletedTaskLengthSubject.next(value);
  }

  increaseIncompleteTaskCount(): void {
    this.incompletedTaskLengthSubject.next(
      this.incompletedTaskLengthSubject.value + 1
    );
  }

  decreaseIncompleteTaskCount(): void {
    if (this.incompletedTaskLengthSubject.value > 0) {
      this.incompletedTaskLengthSubject.next(
        this.incompletedTaskLengthSubject.value - 1
      );
    }
  }

  // task-view Component

  updateTasks(tasks: TaskResponse[]) {
    this.tasksSubject.next(tasks);
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
}
