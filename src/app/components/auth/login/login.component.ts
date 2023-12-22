import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private userService: UserService,
    private router: Router
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
          console.log('error login', err);
        },
      });
    }
  }
}
