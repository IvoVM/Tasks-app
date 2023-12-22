import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserResponse } from 'src/app/types/user.type';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user!: UserResponse | null;
  constructor(private userSvc: UserService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.userSvc.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  openDialog(): void {
    this.dialog.open(LogoutComponent, {
      data: { userEmail: this.user?.email },
    });
  }
}
