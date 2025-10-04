import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token$ = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private user$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || 'null'));

  get token(): Observable<string | null> {
    return this.token$.asObservable();
  }
  get user(): Observable<any> {
    return this.user$.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token$.next(token);
    this.user$.next(user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token$.next(null);
    this.user$.next(null);
  }
}
