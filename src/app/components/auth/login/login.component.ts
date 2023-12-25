import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  showPassword = false;
  spinnerSubscription: Subscription = new Subscription();
  isSpinnerVisible = false;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private spinnerService: SpinnerService,
    private tokenSvc: TokenService
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

    this.subscribeSpinnerService();
  }
  login() {
    if (this.form.valid) {
      this.spinnerService.showSpinner();
      const body = {
        email: this.form.value.email,
        password: this.form.value.password,
      };
      this.authSvc.login(body).subscribe({
        next: (res) => {
          this.userService.setUser(res);
          localStorage.setItem('token', res.access_token);
          this.tokenSvc.setTokenExpiration(res.access_token_expiration);
          this.router.navigateByUrl('home');
        },
        error: (err) => {
          this.openSnackBar(
            'Error, el usuario o la contraseña son incorrectos'
          );
        },
        complete: () => {
          this.spinnerService.hideSpinner();
        },
      });
    }
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 4000,
    });
  }

  subscribeSpinnerService() {
    this.spinnerSubscription = this.spinnerService
      .getSpinnerState()
      .subscribe((isVisible) => {
        this.isSpinnerVisible = isVisible;
      });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }
}
