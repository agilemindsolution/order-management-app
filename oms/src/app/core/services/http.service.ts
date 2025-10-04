import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = environment.apiUrl || 'http://localhost:5000/api';

  constructor(private http: HttpClient, private notificationService: NotificationService) {}
  get<T>(url: string, params?: any): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${url}`, { params })
      .pipe(catchError(this.handleError.bind(this)));
  }

  post<T>(url: string, data: any, config?: any): Observable<T>;
  post<T>(
    url: string,
    data: any,
    config: { observe: 'events'; reportProgress?: boolean }
  ): Observable<HttpEvent<T>>;
  post<T>(url: string, data: any, config?: any): Observable<any> {
    const options = { ...(config || {}) };
    return this.http
      .post<T>(`${this.baseUrl}${url}`, data, options)
      .pipe(catchError(this.handleError.bind(this)));
  }

  put<T>(url: string, data: any, config?: any): Observable<T>;
  put<T>(
    url: string,
    data: any,
    config: { observe: 'events'; reportProgress?: boolean }
  ): Observable<HttpEvent<T>>;
  put<T>(url: string, data: any, config?: any): Observable<any> {
    const options = { ...(config || {}) };
    return this.http
      .put<T>(`${this.baseUrl}${url}`, data, options)
      .pipe(catchError(this.handleError.bind(this)));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${url}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    const status = error.status;
    const message = error.error?.message || 'An unexpected error occurred';

    if (status === 401) {
      // Handle unauthorized access - redirect to login
      // this.router.navigate(['/login']);
    } else if (status >= 400 && status < 500) {
      // this.notificationService.error(message);
    } else {
      // this.notificationService.error('Server error, please try again later.');
    }

    return throwError(() => error);
  }
}
