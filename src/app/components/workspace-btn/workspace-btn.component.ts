import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-workspace-btn',
  template: `
  <button
    mat-button
    [disabled]="disabled"
    class="filter-btn"
    [ngClass]="{
      white: color === 'white',
      blue: color === 'blue',
      grey: color === 'grey'
    }"
  >
    {{ text }}
  </button> 
  `,
  styleUrls: ['./workspace-btn.component.scss'],
})
export class WorkspaceBtnComponent {
  @Input() disabled: boolean = false;
  @Input() text: string = '';
  @Input() color: string = 'blue';

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  get buttonClasses():any {
    return {
      'disabled-text': this.disabled,
      text: !this.disabled,
    };
  }
}
