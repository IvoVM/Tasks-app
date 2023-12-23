import { Component, Input } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskResponse } from 'src/app/types/task.type';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() data!: TaskResponse;

  constructor(private taskService: TasksService) {}

  onCheckboxChange($event: any) {
    const is_completed = $event.target.checked;
    let body = {
      is_completed,
      id: this.data.id,
    };
    this.taskService.updateTaskStatus(body).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
