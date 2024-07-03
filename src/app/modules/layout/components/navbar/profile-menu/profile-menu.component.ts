import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
// import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
// import { ThemeService } from '../../../../../core/services/theme.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { remult } from 'remult';
import { User } from '../../../../../shared/models/User.model';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [NgClass, NgFor, RouterLink, AngularSvgIconModule],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        })
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class ProfileMenuComponent implements OnInit {
  remult = remult;
  user!: User;
  public isOpen = false;
  public profileMenu = [
    // {
    //   title: 'Your Profile',
    //   icon: './assets/icons/heroicons/outline/user-circle.svg',
    //   link: '/profile',
    // },
    // {
    //   title: 'Settings',
    //   icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
    //   link: '/settings',
    // },
    {
      title: 'Log out',
      icon: './assets/icons/heroicons/outline/logout.svg',
      action: 'logOut',
    },
  ];
  actions: { [key: string]: () => void } = {
    logOut: () => this.logOut(),
  };

  public themeColors = [
    {
      name: 'base',
      code: '#e11d48',
    },
    {
      name: 'yellow',
      code: '#f59e0b',
    },
    {
      name: 'green',
      code: '#22c55e',
    },
    {
      name: 'blue',
      code: '#3b82f6',
    },
    {
      name: 'orange',
      code: '#ea580c',
    },
    {
      name: 'red',
      code: '#cc0022',
    },
    {
      name: 'violet',
      code: '#6d28d9',
    },
  ];

  public themeMode = ['light', 'dark'];

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.user = remult.user as User;
  }

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  public logOut() {
    this._authService.signOut();
  }

  executeAction(actionName: string) {
    if (this.actions[actionName]) {
      this.actions[actionName]();
    } else {
      console.error(`Action ${actionName} not found`);
    }
  }
}
