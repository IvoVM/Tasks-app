import { Component, OnInit } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TasksService } from 'src/app/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { Categories } from 'src/app/types/task.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories!: Categories[];
  constructor(private taskSvc: TasksService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.taskSvc.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        console.log(this.categories);
      },
      error: (err) => {
        console.log('error fetching categories', err);
      },
    });
  }

  openForm(): void {
    if (this.categories) {
      this.dialog.open(TaskFormComponent, {
        data: { categories: this.categories },
      });
    } else {
      console.log('form is not available');
    }
  }
}
