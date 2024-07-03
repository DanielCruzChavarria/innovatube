// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    if (!(await this._authService.isLoggedIn())) {
      this.router.navigate(['/login']); 
      return false;
    }
    return true; // Usuario autenticado
  }
}
