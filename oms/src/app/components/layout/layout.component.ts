import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { Subject, takeUntil, filter } from 'rxjs';

interface MenuItem {
  title: string;
  icon: string;
  path: string;
  badge?: number;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class Layout implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  sidebarOpen = false;
  isMobile = false;
  currentPath = '';
  showNotifications = false;
  showUserMenu = false;

  user = {
    name: 'Admin User',
    email: 'admin@oms.com',
  };

  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
    },
    {
      title: 'Orders',
      icon: 'shopping_cart',
      path: '/dashboard/orders',
      badge: 5,
    },
    {
      title: 'Customers',
      icon: 'people',
      path: '/dashboard/customers',
    },
    {
      title: 'Products',
      icon: 'inventory',
      path: '/dashboard/products',
    },
    {
      title: 'Analytics',
      icon: 'analytics',
      path: '/dashboard/analytics',
    },
    {
      title: 'Settings',
      icon: 'settings',
      path: '/dashboard/settings',
    },
  ];

  constructor(private router: Router) {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentPath = event.url;
        if (this.isMobile) {
          this.sidebarOpen = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkMobile() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.sidebarOpen = true;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showUserMenu) this.showUserMenu = false;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    if (this.showNotifications) this.showNotifications = false;
  }

  handleLogout() {
    this.showUserMenu = false;
    this.router.navigate(['/login']);
  }

  isActiveRoute(path: string): boolean {
    return this.currentPath.startsWith(path);
  }

  get displayName(): string {
    return this.user.name || this.user.email.split('@')[0] || 'User';
  }
}
