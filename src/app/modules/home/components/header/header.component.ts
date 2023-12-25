import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserResponse } from 'src/app/types/user.type';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { TasksService } from 'src/app/modules/home/services/tasks.service';
import { Subscription } from 'rxjs';
import { TasksListService } from 'src/app/shared/services/tasksList.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user!: UserResponse | null;
  private incompleteTasksSubscription: Subscription = new Subscription();
  lengthNumber = 0;

  constructor(
    private userSvc: UserService,
    private dialog: MatDialog,
    private taskSvc: TasksService,
    private taskArraySvc: TasksListService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getIncompleteTaskLength();
    this.subscribeToTasks();
  }

  getUserData() {
    this.userSvc.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  getIncompleteTaskLength() {
    this.taskSvc.getIncompleteTasksLenght().subscribe({
      next: (res) => {
        this.taskArraySvc.setFirstValue(res.incomplete_task_count);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  subscribeToTasks() {
    this.incompleteTasksSubscription =
      this.taskArraySvc.incompletedTasksLenght$.subscribe((value) => {
        this.lengthNumber = value;
      });
  }

  ngOnDestroy(): void {
    this.incompleteTasksSubscription.unsubscribe();
  }

  openDialog(): void {
    this.dialog.open(LogoutComponent, {
      data: { userEmail: this.user?.email },
    });
  }
}
