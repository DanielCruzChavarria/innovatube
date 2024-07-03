import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule, RouterOutlet, RouterLink],
})
export class LoginComponent implements OnInit {
  constructor(private _authService: AuthService, private router: Router){}
  async ngOnInit() {
    if (await this._authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
