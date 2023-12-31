import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { TaskResponse } from 'src/app/types/task.type';
import { DeleteTaskModalComponent } from '../delete-task-modal/delete-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TasksListService } from 'src/app/shared/services/tasksList.service';
import { HeaderIconService } from 'src/app/shared/services/header-icon.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  data!: TaskResponse;
  error!: string;
  id!: string;
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private taskArraySvc:TasksListService,
    private dialog: MatDialog,
    private headerIconSvc:HeaderIconService

  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getTaskData(this.id);
    });
  }

  getTaskData(taskId: string) {
    this.tasksService.getTaskById(taskId).subscribe({
      next: (res) => {
        this.data = res;
        this.error = '';
      },
      error: () => {
        this.error = `Los datos para la tarea de id:${taskId} no pudieron ser recuperados, intentelo mas tarde`;
      },
    });
  }

  onCheckboxChange($event: any) {
    const is_completed = $event.target.checked;

    if (this.id) {
      let body = {
        is_completed,
        id: this.id,
      };

      this.tasksService.updateTaskStatus(body).subscribe({
        next: () => {
          is_completed
            ? this.headerIconSvc.decreaseIncompleteTaskCount()
            : this.headerIconSvc.increaseIncompleteTaskCount();
          this.taskArraySvc.toggleTaskCompletion(this.data.id);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openDeleteModal() {
    this.dialog.open(DeleteTaskModalComponent, {
      data: { data: this.data },
    });
  }

}
