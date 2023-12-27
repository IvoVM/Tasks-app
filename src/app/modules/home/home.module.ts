import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TruncateTextPipe } from 'src/app/pipes/truncate-text.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { TimeFormatPipe } from 'src/app/pipes/time-format.pipe';
import { HeaderComponent } from './components/header/header.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { TaskComponent } from './components/task/task.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TasksViewComponent } from './components/tasks-view/tasks-view.component';
import { HomeComponent } from './home.component';
import { NewTaskViewComponent } from './components/create-new-task/create-new-task.component';
import { FormComponent } from './components/edit-form/components/form/form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    EditFormComponent,
    DeleteTaskModalComponent,
    LogoutComponent,
    SearcherComponent,
    TaskComponent,
    TaskDetailComponent,
    TasksViewComponent,
    HomeComponent,
    NewTaskViewComponent,
    TruncateTextPipe,
    TimeFormatPipe,
    DateFormatPipe,
    FormComponent,
  ],
  imports: [SharedModule],
})
export class HomeModule {}
