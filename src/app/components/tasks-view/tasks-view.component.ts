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
  error!: string;
  disableIncompleteBtn = false;
  constructor(private tasksService: TasksService) {}
  ngOnInit(): void {
    this.getIncompleteTasks();
  }

  getIncompleteTasks() {
    this.tasksService.getTasks(10, 1).subscribe({
      next: (res) => {
        this.tasks = res.items;
        if (!this.tasks.length) {
          this.error = 'No hay tareas incompletas';
          this.disableIncompleteBtn = true;
        } else {
          this.error = '';
        }
      },
      error: (err) => {
        this.error =
          ' Hubo un error cargando la data, por favor intentelo de nuevo mas tarde';
      },
    });
  }

  getCompleteTasks() {
    this.tasksService.getTasks(10, 1, true).subscribe({
      next: (res) => {
        this.tasks = res.items;
        if (!this.tasks.length) {
          this.error = 'No hay tareas completas';
        } else {
          this.error = '';
        }
      },
      error: (err) => {
        this.error =
          ' Hubo un error cargando la data, por favor intentelo de nuevo mas tarde';
      },
    });
  }
}
