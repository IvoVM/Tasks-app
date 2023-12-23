import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-workspace-btn',
  templateUrl: './workspace-btn.component.html',
  styleUrls: ['./workspace-btn.component.scss'],
})
export class WorkspaceBtnComponent {
  @Input() disabled: boolean = false;
  @Input() text: string = '';
  @Input() color: string = 'blue';


  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  get buttonClasses(): any {
    return {
      'disabled-text': this.disabled,
      text: !this.disabled,
    };
  }
}
