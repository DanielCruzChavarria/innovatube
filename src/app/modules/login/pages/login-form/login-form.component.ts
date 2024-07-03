import { Component, OnInit } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    NgClass,
    NgIf,
  ],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      authParam: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  async login() {
    this.submitted = true;
    if (!this.loginForm.valid) return;
    const { authParam, password } = this.loginForm.value;
    const encriptedPass = await bcrypt.hash(password, 10);
    try {
      await this._authService.logIn(encriptedPass, authParam);
    } catch (err) {
      // set error on lo gin form
      this.f['password'].setErrors({ incorrect: true });
      this.f['authParam'].setErrors({ incorrect: true });
    }
  }

  async signOut() {
    this._authService.signOut();
    await this._authService.isLoggedIn();
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
}
