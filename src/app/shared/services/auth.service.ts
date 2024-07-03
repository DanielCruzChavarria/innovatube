// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { remult } from 'remult';
import { User } from '../models/User.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private subscriber: Subscription = new Subscription();

  isLoggedIn$ = this.loggedIn.asObservable();

  remult = remult;
  private usersRepo =  remult.repo(User);

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthentication();
  }


  private async checkAuthentication() {
    //
    try {
      const user = await this.http.get<User>('/api/currentUser').toPromise();
      if (user) {
        this.remult.user = user; // Set the authenticated user in Remult

        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
      }
    } catch (error) {
      this.loggedIn.next(false);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    await this.checkAuthentication();
    return this.loggedIn.value;
  }

  async signIn(userObj: User): Promise<void> {
    const userRepo = this.remult.repo(User);
    try {
      // const isEmailInvalid = await this.getUserByEmail(userObj.email);
      // const isUsernameInvalid = await this.getUserByUsername(userObj.username);
      // if (isUsernameInvalid) {
      //   throw new Error('Username already exists');
      // }

      // if (isEmailInvalid) {
      //   throw new Error('Email already exists');
      // }


      // Insertar el usuario
      const insertedUser = await this.usersRepo.insert(userObj);

      if (insertedUser) {
        console.log('User added successfully:', insertedUser);
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Failed to add user');
    }
  }

  signOut() {
    this.http.post('/api/signOut', {}).subscribe(() => {
      this.remult.user = undefined;
      this.loggedIn.next(false);
      //reload page
      this.router.navigate(['/login']);
    });
  }

  async logIn(password: string, queryParam: string): Promise<void> {
    try {
      const isEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
        queryParam
      );
      const user = isEmail
        ? await this.getUserByEmail(queryParam)
        : await this.getUserByUsername(queryParam);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      const userSubscriber = this.http
        .post<User>('/api/logIn', { user, password })
        .subscribe({
          next: (user) => {
            this.remult.user = user;
            this.router.navigate(['/dashboard']);
            this.loggedIn.next(true);
          },
          error: (error) => {
            throw new Error('Failed to log in');
          },
        });
      this.subscriber.add(userSubscriber);
    } catch (error) {
      this.loggedIn.next(false);
      throw new Error('Failed to log in');
    }
  }

  private async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepo.findOne({
      where: { email: email },
    });
  }

  private async getUserByUsername(username: string): Promise<User> {
    return await this.usersRepo.findOne({
      where: { username: username },
    });
  }
}
