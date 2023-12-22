import { Component } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  inputValue = 0;

  onInputChange(event: any) {
    const target = event.target;
    this.inputValue = parseInt(target.value, 10) || 0;
  }

  onCounterChange(value: number) {
    this.inputValue = value;
  }
}
