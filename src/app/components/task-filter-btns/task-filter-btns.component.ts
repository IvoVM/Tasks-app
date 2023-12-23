import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-filter-btns',
  templateUrl: './task-filter-btns.component.html',
  styleUrls: ['./task-filter-btns.component.scss'],
})
export class TaskFilterBtnsComponent {
  @Input() disabled!: boolean;
  @Output() completeButtonClick = new EventEmitter<void>();
  @Output() incompleteButtonClick = new EventEmitter<void>();

  onCompleteButtonClick() {
    this.completeButtonClick.emit();
  }

  onIncompleteButtonClick() {
    this.incompleteButtonClick.emit();
  }
}
