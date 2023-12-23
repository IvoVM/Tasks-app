// task-form.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService } from 'src/app/services/tasks.service';
import { Categories } from 'src/app/types/task.type';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  form: FormGroup;
  inputValue = 1;
  categories: Categories[] = [];
  selectedCategoryId!: number;
  error!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categories: Categories[] },
    private fb: FormBuilder,
    private taskSvc: TasksService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TaskFormComponent>
  ) {
    if (data && data.categories) {
      this.categories = data.categories;
    }

    this.form = this.fb.group({
      title: ['', Validators.required, Validators.maxLength(50)],
      description: ['', Validators.required, Validators.maxLength(500)],
    });
  }

  onInputChange(event: any) {
    const target = event.target;
    this.inputValue = parseInt(target.value, 5) || 1;
  }

  onCounterChange(value: number) {
    this.inputValue = value;
  }

  onCategorySelected(categoryId: number) {
    this.selectedCategoryId = categoryId;
    console.log(this.selectedCategoryId);
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 4000,
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }

  createTask() {
    if (!this.form.valid) {
      this.error =
        'Completa correctamente los campos de titulo (max: 50 car.) y descripción (max: 500 car.)';
    }

    if (this.form.valid && !this.selectedCategoryId) {
      this.error = 'Porfavor seleccionar una categoria';
    }

    if (this.form.valid && this.selectedCategoryId) {
      let body = {
        title: this.form.value.title,
        description: this.form.value.description,
        category_id: this.selectedCategoryId,
        priority: this.inputValue,
      };
      this.taskSvc.createTask(body).subscribe({
        next: (res) => {
          this.openSnackBar('Tarea creada con exito');
          this.closeDialog();
        },
        error: (err) => {
          this.openSnackBar(
            'Hubo un error al crear la tarea, intentelo más tarde'
          );
        },
      });
    }
  }
}
