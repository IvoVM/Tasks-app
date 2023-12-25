import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  showPassword = false;

  spinnerSubscription: Subscription = new Subscription();
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private spinnerService: SpinnerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/
          ),
        ],
      ],
      repeatPassword: ['', [Validators.required]],
    });

    this.subscribeSpinnerService();
  }

  register() {
    if (this.form.invalid)
      return this.openSnackBar(
        'El formulario no cumple los requisitos, compruebe la data colocada.'
      );

    if (this.form.value.password !== this.form.value.repeatPassword)
      return this.openSnackBar(
        'Atención las contraseñas colocadas no coinciden.'
      );

    let body: User = {
      email: this.form.value.email,
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      password: this.form.value.password,
    };
    this.authSvc.register(body).subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
        this.openSnackBar(
          'Cuenta creada exitosamente, proceda a logearse en la aplicación'
        );
      },
      error: () => {
        this.openSnackBar('Ese email no está disponible');
      },
      complete: () => {
        this.spinnerService.hideSpinner();
      },
    });
  }

  subscribeSpinnerService() {
    this.spinnerSubscription = this.spinnerService
      .getSpinnerState()
      .subscribe((isVisible) => {
        this.showSpinner = isVisible;
      });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 4000,
    });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }
}
