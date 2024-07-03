import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { environment } from '../../../../../environments/environment.prod';
import { User } from '../../../../shared/models/User.model';
import { AuthService } from '../../../../shared/services/auth.service';
@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    RecaptchaModule,
    NgClass,
    NgIf,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.SITE_KEY,
      } as RecaptchaSettings,
    },
  ],
})
export class SigninFormComponent implements OnInit {
  userForm!: FormGroup;
  user: User = new User();
  submitted = false;
  passwordVisible = false;
  recaptchaToken: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            PasswordValidator.strong,
            Validators.minLength(8),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        token: [null, [Validators.required]],
      },
      {
        validators: this.matchValidator('password', 'confirmPassword'),
      }
    );
  }

  get f() {
    return this.userForm.controls;
  }

  matchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (
        matchingControl!.errors &&
        !matchingControl!.errors?.['confirmedValidator']
      ) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: true };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  handleRecaptchaResolved(token: string): void {
    this.recaptchaToken = token;
    // Actualizar el valor del campo 'token' en el formulario
    this.userForm.patchValue({
      token: token,
    });
  }

  async saveUser(userForm: FormGroup): Promise<void> {
    console.log(this.userForm);
    this.submitted = true;
    if (userForm.invalid) {
      for (const control of Object.keys(userForm.controls)) {
        userForm.controls[control].markAsTouched();
      }
      return;
    }

    try {
      await this._authService.signIn(userForm.value);
        this.router.navigate(['/login']);
    } catch (error: any) {
      if (error.message === 'Username already exists') {
        userForm.controls['username'].setErrors({ alreadyExists: true });
      } else if (error.message === 'Email already exists') {
        userForm.controls['email'].setErrors({ alreadyExists: true });
      }
      userForm.markAsTouched();
    }
  }
}
export interface ValidationResult {
  number?: boolean;
  upper?: boolean;
  lower?: boolean;
}
export class PasswordValidator {
  public static strong(control: FormControl): ValidationResult | null {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    const valid = hasNumber && hasUpper && hasLower;
    const result: ValidationResult = {};
    if (!valid) {
      if (!hasNumber) {
        result.number = true;
      }

      if (!hasUpper) {
        result.upper = true;
      }

      if (!hasLower) {
        result.lower = true;
      }
      return Object.keys(result).length > 0 ? result : null;
    }
    return null;
  }
}
