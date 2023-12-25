import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

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
    private router: Router,
    private dialogRef: MatDialogRef<LogoutComponent>
  ) {
    this.userEmail = data.userEmail;
  }
  logout() {
    this.userSvc.clearUser();
    this.closeDialog();
    this.router.navigateByUrl('login');
  }
  closeDialog(){
    this.dialogRef.close(); 

  }
}
