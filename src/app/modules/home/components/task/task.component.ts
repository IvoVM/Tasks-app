import { Component, Input } from '@angular/core';
import { TasksService } from 'src/app/modules/home/services/tasks.service';
import { TaskResponse } from 'src/app/types/task.type';
import { DeleteTaskModalComponent } from '../delete-task-modal/delete-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TasksListService } from 'src/app/shared/services/tasksList.service';
import { HeaderIconService } from 'src/app/shared/services/header-icon.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() data!: TaskResponse;

  constructor(
    private taskService: TasksService,
    private dialog: MatDialog,
    private taskArraySvc: TasksListService,
    private headerIconSvc:HeaderIconService
  ) {}

  onCheckboxChange($event: any) {
    const is_completed = $event.target.checked;
    
    if (this.data && this.data.id) {
      let body = {
        is_completed,
        id: this.data.id,
      };
  
      this.taskService.updateTaskStatus(body).subscribe({
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
