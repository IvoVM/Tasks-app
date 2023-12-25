import { NgModule } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { WorkspaceBtnComponent } from './components/workspace-btn/workspace-btn.component';
import { CategoryInputComponent } from './components/inputs/category-input/category-input.component';
import { PriorityInputComponent } from './components/inputs/priority-input/priority-input.component';
import { CommonModule } from '@angular/common';
import { SpinnerInterceptorService } from './interceptors/spinner-interceptor.service';
import { AngularMaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskFormComponent,
    WorkspaceBtnComponent,
    CategoryInputComponent,
    PriorityInputComponent,
  ],
  exports: [
    TaskFormComponent,
    WorkspaceBtnComponent,
  ],
  imports: [CommonModule,AngularMaterialModule,FormsModule,ReactiveFormsModule],
})
export class SharedModule {}
