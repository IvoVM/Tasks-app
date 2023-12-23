import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
    });
  }
  login() {
    if (this.form.valid) {
      const body = {
        email: this.form.value.email,
        password: this.form.value.password,
      };
      this.authSvc.login(body).subscribe({
        next: (res) => {
          this.userService.setUser(res);
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('token_expires', res.access_token_expiration);
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigateByUrl('home');
        },
        error: (err) => {
          this.openSnackBar('Error, el usuario o la contraseña son incorrectos')
        },
      });
    }
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 4000,
    });
  }
  
}
