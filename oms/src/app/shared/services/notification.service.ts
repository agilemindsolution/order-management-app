import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, title?: string) {
    this.showToast(message, title, 'success');
  }

  error(message: string, title?: string) {
    this.showToast(message, title, 'destructive');
  }

  info(message: string, title?: string) {
    this.showToast(message, title, 'default');
  }

  private showToast(
    message: string,
    title?: string,
    variant: 'default' | 'destructive' | 'success' = 'default'
  ) {
    // Using Material Snackbar for now, can be replaced with custom toast
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass:
        variant === 'success'
          ? 'success-toast'
          : variant === 'destructive'
          ? 'error-toast'
          : 'info-toast',
    });

    const toast: Toast = {
      id: this.generateId(),
      title,
      description: message,
      variant,
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      this.removeToast(toast.id);
    }, 5000);
  }

  removeToast(id: string) {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter((t) => t.id !== id));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
