import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
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
      });
    }
  }

  // register() {
  //   if (
  //     this.form.valid &&
  //     this.form.value.password === this.form.value.repeatPassword
  //   ) {
  //     const email = this.form.value.email;

  //     this.authSvc
  //       .checkEmailInUse(email)
  //       .pipe(
  //         switchMap((res) => {
  //           if (res.status === 404) {
  //             // El correo electrónico no está tomado, puedes proceder con el registro
  //             let body: User = {
  //               email: this.form.value.email,
  //               first_name: this.form.value.first_name,
  //               last_name: this.form.value.last_name,
  //               password: this.form.value.password,
  //             };
  //             console.log('email disponible');

  //             return this.authSvc.register(body);
  //           } else {
  //             // El correo electrónico ya está tomado, muestra un mensaje o toma alguna acción
  //             console.log('El correo electrónico ya está registrado');
  //             return [];
  //           }
  //         })
  //       )
  //       .subscribe({
  //         next: (registroRes) => {
  //           console.log('Registro exitoso', registroRes);
  //         },
  //         error: (err) => {
  //           console.log('Error al registrar', err);
  //         },
  //       });
  //   }
  // }
}
