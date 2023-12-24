import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskArrayService } from 'src/app/shared/task-array.service';
import { Categories } from 'src/app/types/task.type';

@Component({
  selector: 'app-new-task-view',
  templateUrl: './new-task-view.component.html',
  styleUrls: ['./new-task-view.component.scss'],
})
export class NewTaskViewComponent implements OnInit {
  categories: Categories[] = [];

  constructor(
    private taskSvc: TasksService,
    private _snackBar: MatSnackBar,
    private taskArraySvc: TaskArrayService,
    private router:Router
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
