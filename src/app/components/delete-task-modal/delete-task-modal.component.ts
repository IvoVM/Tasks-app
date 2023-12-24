import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskArrayService } from 'src/app/shared/services/task-array.service';
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
    private taskArraySvc: TaskArrayService
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
          this.taskArraySvc.decreaseIncompleteTaskCount();
        this.closeDialog();
        this.openSnackBar(`La tarea de id:${id}, fué eliminada con éxito`);
      },
      error: () => {
        this.closeDialog();
        this.openSnackBar(`La tarea no pudo ser eliminada intentelo más tarde`);
      },
    });
  }
}
