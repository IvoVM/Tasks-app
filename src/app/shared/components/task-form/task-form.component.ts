// task-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedCategoryId!: number;
  error!: string;
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() btnText!: string;
  @Input() showSpinner: boolean = false;

  @Input() categories: Categories[] = [];
  @Output() sendFormData = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private taskSvc: TasksService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
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
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 4000,
    });
  }

  manageFormData() {
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
      this.sendFormData.emit(body);
    }
  }
}
