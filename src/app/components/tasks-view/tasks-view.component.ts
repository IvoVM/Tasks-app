import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskResponse } from 'src/app/types/task.type';
import { Subscription } from 'rxjs';
import { TaskArrayService } from 'src/app/shared/services/task-array.service';
import { TasksService } from 'src/app/services/tasks.service';
import { SearchService } from 'src/app/services/search.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

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
  incompletedBtnSelected = true;
  current_page = 1;

  showSpinner = false;
  spinnerSubscription: Subscription = new Subscription();

  error = '';

  private tasksSubscription: Subscription = new Subscription();

  constructor(
    private taskArraySvc: TaskArrayService,
    private taskSvc: TasksService,
    private spinnerService: SpinnerService
  ) {}

  //Lifecycles

  ngOnInit(): void {
    this.subscribeToTasks();
    this.subscribeSpinnerService();
    this.HttpRequestGetTasks();
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
    this.spinnerSubscription.unsubscribe();
  }

  //Subscriptions
  subscribeToTasks() {
    this.tasksSubscription = this.taskArraySvc.tasks$.subscribe((tasks) => {
      if (this.incompletedBtnSelected) {
        this.tasks = tasks.filter((task) => !task.is_completed);
      } else {
        this.tasks = tasks.filter((task) => task.is_completed);
      }
    });
  }

  subscribeSpinnerService() {
    this.spinnerSubscription = this.spinnerService
      .getSpinnerState()
      .subscribe((isVisible) => {
        this.showSpinner = isVisible;
      });
  }

  //Buttons filter management
  getIncompletedTasks() {
    this.spinnerService.showSpinner();
    this.incompletedBtnSelected = true;
    this.current_page = 1;
    this.HttpRequestGetTasks();
  }
  getCompletedTasks() {
    this.spinnerService.showSpinner();
    this.incompletedBtnSelected = false;
    this.current_page = 1;
    this.HttpRequestGetTasks();
  }

  // HTTP request

  HttpRequestGetTasks(push: boolean = false) {
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
      complete: () => {
        this.spinnerService.hideSpinner();
      },
    });
  }

  //Tasks array management, push or create new one
  updateTasksList(tasksArray: TaskResponse[]) {
    this.taskArraySvc.updateTasks(tasksArray);
  }
  pushTasksList(tasksArray: TaskResponse[]) {
    this.taskArraySvc.pushTasks(tasksArray);
  }

  //load next page
  loadNextPage() {
    this.current_page++;
    this.HttpRequestGetTasks(true);
  }
}
