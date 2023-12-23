import { Component, Input } from '@angular/core';
import { TaskResponse } from 'src/app/types/task.type';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() data!: TaskResponse;
}
