import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class publicGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    const token = this.authService.getToken();
    if (!token) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
