import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskResponse } from 'src/app/types/task.type';
import { Subscription } from 'rxjs';
import { TaskArrayService } from 'src/app/shared/services/task-array.service';
import { TasksService } from 'src/app/services/tasks.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styles: [
    `
      .m-w-300 {
        max-width: 417px;
        display: block;
      }
    `,
  ],
})
export class TasksViewComponent implements OnInit, OnDestroy {
  tasks: TaskResponse[] = [];
  error = '';
  incompletedBtnSelected = true;
  current_page = 1;

  private tasksSubscription: Subscription = new Subscription();

  constructor(
    private taskArraySvc: TaskArrayService,
    private taskSvc: TasksService
  ) {}

  ngOnInit(): void {
    this.subscribeToTasks();
    this.getTasks();
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }

  //subscriptions
  subscribeToTasks() {
    this.tasksSubscription = this.taskArraySvc.tasks$.subscribe((tasks) => {
      if (this.incompletedBtnSelected) {
        this.tasks = tasks.filter((task) => !task.is_completed);
      } else {
        this.tasks = tasks.filter((task) => task.is_completed);
      }
    });
  }

  // HTTP request

  getTasks(push: boolean = false) {
    const taskObservable = this.incompletedBtnSelected
      ? this.taskSvc.getTasks(3, this.current_page, false)
      : this.taskSvc.getTasks(3, this.current_page, true);

    taskObservable.subscribe({
      next: (res) => {
        push ? this.pushTasksList(res.items) : this.updateTasksList(res.items);

        if (!this.tasks.length) {
          this.error = this.incompletedBtnSelected
            ? 'No hay tareas incompletas'
            : 'No hay tareas completas';
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

  updateTasksList(tasksArray: TaskResponse[]) {
    this.taskArraySvc.updateTasks(tasksArray);
  }
  pushTasksList(tasksArray: TaskResponse[]) {
    this.taskArraySvc.pushTasks(tasksArray);
  }

  loadNextPage() {
    this.current_page++;
    this.getTasks(true);
  }
}
