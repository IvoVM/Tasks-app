import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-priority-input',
  templateUrl: './priority-input.component.html',
  styleUrls: ['./priority-input.component.scss'],
})
export class PriorityInputComponent {
  @Input() counterValue = 0;
  @Output() counterChange = new EventEmitter<number>();

  increment() {
    this.counterValue++;
    this.emitCounterValue();
  }

  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;
      this.emitCounterValue();
    }
  }

  private emitCounterValue() {
    this.counterChange.emit(this.counterValue);
  }
}
