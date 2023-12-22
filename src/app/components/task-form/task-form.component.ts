import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories } from 'src/app/types/task.type';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  inputValue = 1;
  categories: Categories[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categories: Categories[] }
  ) {
    // Inicializar las categorías con los datos proporcionados
    if (data && data.categories) {
      this.categories = data.categories;
    }
  }

  onInputChange(event: any) {
    const target = event.target;
    this.inputValue = parseInt(target.value, 10) || 1;
  }

  onCounterChange(value: number) {
    this.inputValue = value;
  }
}
