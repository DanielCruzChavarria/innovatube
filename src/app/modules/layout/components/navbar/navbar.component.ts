import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { MenuService } from '../../services/menu.service';
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { remult } from 'remult';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    AngularSvgIconModule,
    ProfileMenuComponent,
    NavbarMobileComponent,
    LoginMenuComponent,
    NgIf,
  ],
})
export class NavbarComponent implements OnInit {
  remult = remult;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
