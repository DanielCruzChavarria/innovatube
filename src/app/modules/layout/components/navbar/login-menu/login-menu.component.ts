import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
// import { ClickOutsideDirective } from 'your-path-to-directive';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss'],
  standalone: true,
  imports: [NgClass, NgFor, RouterLink],
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
export class LoginMenuComponent {
  public isOpen = false;

  constructor() {}

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
}
