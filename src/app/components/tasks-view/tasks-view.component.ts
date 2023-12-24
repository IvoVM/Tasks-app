import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskResponse } from 'src/app/types/task.type';
import { Subscription } from 'rxjs';
import { TaskArrayService } from 'src/app/shared/services/task-array.service';
import { TasksService } from 'src/app/services/tasks.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
})
export class TasksViewComponent implements OnInit, OnDestroy {
  tasks: TaskResponse[] = [];
  error = '';
  incompletedBtnSelected = true;

  private tasksSubscription: Subscription = new Subscription();
  private searchTermSubscription: Subscription = new Subscription();

  constructor(
    private taskArraySvc: TaskArrayService,
    private taskSvc: TasksService,
    private searcherSvc: SearchService
  ) {}

  ngOnInit(): void {
    this.subscribeToTasks();
    this.subscribeToSearchTerm();
    this.getIncompleteTasks();
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
    this.searchTermSubscription.unsubscribe();
  }

  //subscriptions
  subscribeToTasks(): void {
    this.tasksSubscription = this.taskArraySvc.tasks$.subscribe((tasks) => {
      this.filterTasks(tasks);
    });
  }

  subscribeToSearchTerm(): void {
    this.searchTermSubscription = this.searcherSvc.searchTerm$.subscribe(
      (searchTerm) => {
        this.taskArraySvc.updateTasks(this.tasks);
        if (searchTerm === '') {
          // If searchTerm is empty, fetch all tasks based on the selected button
          if (this.incompletedBtnSelected) {
            this.getIncompleteTasks();
          } else {
            this.getCompleteTasks();
          }
        } else {
          this.filterTasks(this.tasks, searchTerm);
        }
      }
    );
  }

  //filter
  filterTasks(tasks: TaskResponse[], searchTerm: string = ''): void {
    if (this.incompletedBtnSelected) {
      this.tasks = tasks.filter(
        (task) => !task.is_completed && this.matchesSearchTerm(task, searchTerm)
      );
    } else {
      this.tasks = tasks.filter(
        (task) => task.is_completed && this.matchesSearchTerm(task, searchTerm)
      );
    }
  }

  matchesSearchTerm(task: TaskResponse, searchTerm: string): boolean {
    return (
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // HTTP request

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
