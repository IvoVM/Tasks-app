import { ActivatedRoute } from '@angular/router';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { TaskResponse } from 'src/app/types/task.type';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  data!: TaskResponse;
  error!: string;
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const taskId = params['id'];
      this.getTaskData(taskId);
    });
  }

  getTaskData(taskId: string) {
    this.tasksService.getTaskById(taskId).subscribe({
      next: (res) => {
        this.data = res;
        this.error = '';
      },
      error: () => {
        this.error = `Los datos para la tarea de id:${taskId} no pudieron ser recuperados, intentelo mas tarde`;
      },
    });
  }
}
