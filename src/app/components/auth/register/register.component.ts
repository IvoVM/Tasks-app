import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
    private spinnerService: SpinnerService
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
    if (
      this.form.valid &&
      this.form.value.password === this.form.value.repeatPassword
    ) {
      let body: User = {
        email: this.form.value.email,
        first_name: this.form.value.first_name,
        last_name: this.form.value.last_name,
        password: this.form.value.password,
      };
      this.authSvc.register(body).subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.spinnerService.hideSpinner();
        },
      });
    }
  }

  subscribeSpinnerService() {
    this.spinnerSubscription = this.spinnerService
      .getSpinnerState()
      .subscribe((isVisible) => {
        this.showSpinner = isVisible;
        console.log(isVisible);
      });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }
}
