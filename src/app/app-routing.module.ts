import { NewTaskViewComponent } from './components/new-task-view/new-task-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './Guards/auth.guard';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    // loadChildren: () =>
    //   import('./components/home/home.component').then((m) => m.HomeComponent),
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
  },
  {
    path: 'createTask',
    component: NewTaskViewComponent,
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
