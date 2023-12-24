import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskArrayService } from 'src/app/shared/services/task-array.service';
import { Categories } from 'src/app/types/task.type';

@Component({
  selector: 'app-new-task-view',
  templateUrl: './new-task-view.component.html',
  styles: [
    `
      .blue-line {
        border-bottom: 1px solid #5230ff;
      }
    `,
  ],
})
export class NewTaskViewComponent implements OnInit {
  categories: Categories[] = [];

  constructor(
    private taskSvc: TasksService,
    private _snackBar: MatSnackBar,
    private taskArraySvc: TaskArrayService,
    private router: Router
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
    });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 4000,
    });
  }
}
