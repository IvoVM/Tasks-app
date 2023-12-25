import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { TaskArrayService } from 'src/app/shared/services/task-array.service';
import { Categories } from 'src/app/types/task.type';

@Component({
  selector: 'app-new-task-view',
  templateUrl: './new-task-view.component.html',
})
export class NewTaskViewComponent implements OnInit, OnDestroy {
  categories: Categories[] = [];

  spinnerSubscription: Subscription = new Subscription();
  showSpinner = false;

  constructor(
    private taskSvc: TasksService,
    private _snackBar: MatSnackBar,
    private taskArraySvc: TaskArrayService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}
  ngOnInit(): void {
    this.getFormCategories();
  }
  getFormCategories(): void {
    this.taskSvc.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log('error fetching categories', err);
      },
    });
  }

  uploadNewTask(event: any) {
    this.spinnerService.showSpinner();
    this.taskSvc.createTask(event).subscribe({
      next: () => {
        this.openSnackBar('Tarea subida con exito');
        this.taskArraySvc.increaseIncompleteTaskCount();
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.openSnackBar(
          'Error al intentar subir la tarea, intentelo mas tarde'
        );
      },
      complete: () => {
        this.spinnerService.hideSpinner();
      },
    });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 4000,
    });
  }

  subscribeSpinnerService() {
    this.spinnerSubscription = this.spinnerService
      .getSpinnerState()
      .subscribe((isVisible) => {
        this.showSpinner = isVisible;
      });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }
}
