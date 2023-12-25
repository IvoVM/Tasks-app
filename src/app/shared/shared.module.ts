// SharedModule
import { NgModule } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { WorkspaceBtnComponent } from './components/workspace-btn/workspace-btn.component';
import { CategoryInputComponent } from './components/inputs/category-input/category-input.component';
import { PriorityInputComponent } from './components/inputs/priority-input/priority-input.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TaskFormComponent,
    WorkspaceBtnComponent,
    CategoryInputComponent,
    PriorityInputComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TaskFormComponent,
    WorkspaceBtnComponent,
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
