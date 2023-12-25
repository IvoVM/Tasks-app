import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/modules/home/services/tasks.service';
import { HeaderIconService } from 'src/app/shared/services/header-icon.service';
import { TasksListService } from 'src/app/shared/services/tasksList.service';
import { TaskResponse } from 'src/app/types/task.type';

@Component({
  selector: 'app-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
})
export class DeleteTaskModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: TaskResponse },
    private dialogRef: MatDialogRef<DeleteTaskModalComponent>,
    private taskSvc: TasksService,
    private _snackBar: MatSnackBar,
    private taskArraySvc: TasksListService,
    private router: Router,
    private headerIconSvc :HeaderIconService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 4000,
    });
  }

  deleteTask() {
    const id = this.data.data.id;
    this.taskSvc.deleteTask(id).subscribe({
      next: () => {
        //Update View trough subjects
        this.taskArraySvc.deleteTaskById(id);
        if (!this.data.data.is_completed)
          this.headerIconSvc.decreaseIncompleteTaskCount();
        this.closeDialog();
        this.router.navigateByUrl('home');
        this.openSnackBar(`La tarea de id:${id}, fué eliminada con éxito`);
      },
      error: () => {
        this.closeDialog();
        this.openSnackBar(`La tarea no pudo ser eliminada intentelo más tarde`);
      },
    });
  }
}
