import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './components/task/task.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoutComponent } from './components/logout/logout.component';
import { TokenInterceptorService } from './shared/interceptors/token-interceptor.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TasksViewComponent } from './components/tasks-view/tasks-view.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { WorkspaceBtnComponent } from './components/workspace-btn/workspace-btn.component';
import { NewTaskViewComponent } from './components/new-task-view/new-task-view.component';
import { TaskFormComponent } from './shared/components/task-form/task-form.component';
import { PriorityInputComponent } from './shared/components/task-form/components/priority-input/priority-input.component';
import { CategoryInputComponent } from './shared/components/task-form/components/category-input/category-input.component';
import { InputComponent } from './shared/components/input/input.component';
import { SpinnerInterceptorService } from './shared/interceptors/spinner-interceptor.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TaskComponent,
    HeaderComponent,
    FooterComponent,
    SearcherComponent,
    LogoutComponent,
    TaskFormComponent,
    CategoryInputComponent,
    PriorityInputComponent,
    TasksViewComponent,
    TimeFormatPipe,
    DateFormatPipe,
    TruncateTextPipe,
    TaskDetailComponent,
    DeleteTaskModalComponent,
    EditFormComponent,
    WorkspaceBtnComponent,
    NewTaskViewComponent,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
