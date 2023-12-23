import { TasksService } from 'src/app/services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { TaskResponse } from 'src/app/types/task.type';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
})
export class TasksViewComponent implements OnInit {
  tasks!: TaskResponse[];

  constructor(private tasksService: TasksService) {}
  ngOnInit(): void {
    this.tasksService.getTasks(10, 1, false).subscribe({
      next: (res) => {
        this.tasks = res.items;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
