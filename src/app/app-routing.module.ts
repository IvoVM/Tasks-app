import { NewTaskViewComponent } from './modules/home/components/create-new-task/create-new-task.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './Guards/auth.guard';
import { TaskDetailComponent } from './modules/home/components/task-detail/task-detail.component';
import { EditFormComponent } from './modules/home/components/edit-form/edit-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'task/:id',
    component: TaskDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createTask',
    component: NewTaskViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editTask/:id',
    component: EditFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
