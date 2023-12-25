// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskResponse } from '../../types/task.type';

@Injectable({
  providedIn: 'root',
})
export class HeaderIconService {

  private incompletedTaskLengthSubject = new BehaviorSubject<number>(0);
  incompletedTasksLenght$ = this.incompletedTaskLengthSubject.asObservable();

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

}
