import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categories } from 'src/app/types/task.type';

@Component({
  selector: 'app-category-input',
  templateUrl: './category-input.component.html',
  styleUrls: ['./category-input.component.scss'],
})
export class CategoryInputComponent {
  @Input() categories: Categories[] = [];
  @Output() categorySelected = new EventEmitter<number>();
  selectedCategoryId: number | undefined;

  onSelectChange() {
    if (this.selectedCategoryId !== undefined) {
      this.categorySelected.emit(this.selectedCategoryId);
    }
  }
}
