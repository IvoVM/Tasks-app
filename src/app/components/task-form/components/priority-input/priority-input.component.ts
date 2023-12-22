import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-priority-input',
  templateUrl: './priority-input.component.html',
  styleUrls: ['./priority-input.component.scss'],
})
export class PriorityInputComponent {
  private _counterValue = 1;

  @Input()
  get counterValue(): number {
    return this._counterValue;
  }

  set counterValue(value: number) {
    // Limitar el valor entre 1 y 5
    this._counterValue = Math.min(5, Math.max(1, value));
    this.emitCounterValue();
  }

  @Output() counterChange = new EventEmitter<number>();

  increment() {
    if (this._counterValue < 5) {
      this._counterValue++;
      this.emitCounterValue();
    }
  }

  decrement() {
    if (this._counterValue > 1) {
      this._counterValue--;
      this.emitCounterValue();
    }
  }

  private emitCounterValue() {
    this.counterChange.emit(this._counterValue);
  }
}
