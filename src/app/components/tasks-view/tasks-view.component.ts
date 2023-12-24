import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskResponse } from 'src/app/types/task.type';
import { Subscription } from 'rxjs';
import { TaskArrayService } from 'src/app/shared/task-array.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
})
export class TasksViewComponent implements OnInit, OnDestroy {
  tasks!: TaskResponse[];
  error!: string;
  incompletedBtnSelected = true;

  private tasksSubscription: Subscription = new Subscription();

  constructor(
    private taskArraySvc: TaskArrayService,
    private taskSvc: TasksService
  ) {}

  ngOnInit(): void {
    this.subscribeToTasks();
    this.getIncompleteTasks();
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }

  //Se Subscribe a los cambios en el array para actualizar el listado de tasks.
  subscribeToTasks() {
    this.tasksSubscription = this.taskArraySvc.tasks$.subscribe((tasks) => {
      if (this.incompletedBtnSelected) {
        this.tasks = tasks.filter((task) => !task.is_completed);
      } else {
        this.tasks = tasks.filter((task) => task.is_completed);
      }
    });
  }

  getIncompleteTasks() {
    this.incompletedBtnSelected = true;
    this.taskSvc.getTasks(10, 1).subscribe({
      next: (res) => {
        this.taskArraySvc.updateTasks(res.items);
        if (!this.tasks.length) {
          this.error = 'No hay tareas incompletas';
        } else {
          this.error = '';
        }
      },
      error: () => {
        this.error =
          'Hubo un error cargando la data, por favor inténtelo de nuevo más tarde';
      },
    });
  }

  getCompleteTasks() {
    this.incompletedBtnSelected = false;
    this.taskSvc.getTasks(10, 1, true).subscribe({
      next: (res) => {
        this.taskArraySvc.updateTasks(res.items);
        if (!this.tasks.length) {
          this.error = 'No hay tareas completas';
        } else {
          this.error = '';
        }
      },
      error: () => {
        this.error =
          'Hubo un error cargando la data, por favor inténtelo de nuevo más tarde';
      },
    });
  }
}
