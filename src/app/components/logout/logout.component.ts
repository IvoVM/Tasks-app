import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  userEmail: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userEmail: string },
    private userSvc: UserService,
    private router: Router
  ) {
    this.userEmail = data.userEmail;
  }
  logout() {
    this.userSvc.clearUser();
    this.router.navigateByUrl('login');
  }
}
