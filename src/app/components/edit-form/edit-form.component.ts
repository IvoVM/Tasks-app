import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskArrayService } from 'src/app/shared/services/task-array.service';
import { Categories, Task } from 'src/app/types/task.type';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
})


export class EditFormComponent implements OnInit {
  categories: Categories[] = [];
  id = this.route.snapshot.paramMap.get('id');
  taskTitle = this.route.snapshot.paramMap.get('title');

  constructor(
    private taskSvc: TasksService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getFormCategories();
  }
  getFormCategories(): void {
    this.taskSvc.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        console.log(res);
      },
      error: (err) => {
        console.log('error fetching categories', err);
      },
    });
  }

  editTask(event: Task) {
    if (this.id) {
      this.taskSvc.updateTask(this.id, event).subscribe({
        next: () => {
          this.router.navigateByUrl('home');
          console.log('Task updated');
        },
        error: () => {
          console.log('error updating');
        },
      });
    }
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 4000,
    });
  }
}
