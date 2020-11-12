import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';


import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })

export class AuthService {

  public subject = new Subject<any>();
  private baseUrl = 'http://localhost:3000/user';
  public uname;
  public code;
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  // get token from server
  getToken() {
    return this.token;
  }

  // get user auth information
  getIsAuth() {
    return this.isAuthenticated;
  }

  // get observable type values
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // http client api for create user
  createUser(name: string, email: string, password: string) {
    const userData: User = {name, email, password};
    console.log(userData);
    return this.http.post<{code: number}>(this.baseUrl + '/signup', userData);
  }

  // http client api for login
  login(email: string, password: string) {
    const userData: User = {email, password};
    this.http
      .post<{ token: string; expiresIn: number; name: string, code: number  }>(
        this.baseUrl + '/login',
        userData
      )
      .subscribe(response => {
        const token = response.token;

        const code = response.code;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.sendName(response.name);
          this.sendCode(response.code);
        }
      });
  }

  // send name as observable
  public sendName(name: string) {
    this.subject.next({ text : name});
  }

  public getName(): Observable<any> {
    return this.subject.asObservable();
  }

  public sendCode(code: number) {
    this.subject.next({ number : code});
  }

  public getCode(): Observable<any> {
    return this.subject.asObservable();
  }

  // set time interval for token validation
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // session out
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // save auth information in local storage
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  // clear auth data in local storage
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  // get auth data for auto auth data
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }
}

