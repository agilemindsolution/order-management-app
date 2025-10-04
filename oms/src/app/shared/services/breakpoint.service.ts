import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Breakpoint {
  private readonly MOBILE_BREAKPOINT = 768;

  constructor(private breakpointObserver: BreakpointObserver) {}

  isMobile(): Observable<boolean> {
    return this.breakpointObserver
      .observe(`(max-width: ${this.MOBILE_BREAKPOINT - 1}px)`)
      .pipe(map((result) => result.matches));
  }

  isTablet(): Observable<boolean> {
    return this.breakpointObserver
      .observe([Breakpoints.Tablet])
      .pipe(map((result) => result.matches));
  }

  isDesktop(): Observable<boolean> {
    return this.breakpointObserver
      .observe([Breakpoints.Web, Breakpoints.Large])
      .pipe(map((result) => result.matches));
  }
}
