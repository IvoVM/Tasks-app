import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { TaskArrayService } from 'src/app/shared/services/task-array.service';
import { Categories, Task } from 'src/app/types/task.type';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
})
export class EditFormComponent implements OnInit, OnDestroy {
  categories: Categories[] = [];
  id = this.route.snapshot.paramMap.get('id');
  taskTitle = this.route.snapshot.paramMap.get('title');

  spinnerSubscription: Subscription = new Subscription();
  showSpinner = false;

  constructor(
    private taskSvc: TasksService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
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
        console.error(err);
        this.openSnackBar('Hubo un error intentelo mas tarde');
      },
      complete: () => {
        this.spinnerService.hideSpinner();
      },
    });
  }

  editTask(event: Task) {
    this.spinnerService.showSpinner();
    if (this.id) {
      this.taskSvc.updateTask(this.id, event).subscribe({
        next: () => {
          this.openSnackBar('La tarea fue editada con exito');
          this.router.navigateByUrl('home');
        },
        error: (err) => {
          console.log(err);
          this.openSnackBar(
            'Hubo un error al editar la tarea, intentelo mas tarde.'
          );
        },
        complete: () => {
          this.spinnerService.hideSpinner();
        },
      });
    }
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
