import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { API_ROUTES } from '../../../core/constants/api-routes';
import { Customer } from '../../../shared/models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customersSubject = new BehaviorSubject<Customer[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public customers$ = this.customersSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private httpService: HttpService) {}

  fetchCustomers(): Observable<Customer[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.httpService.get<any[]>(API_ROUTES.clients).pipe(
      tap((response) => {
        const mappedCustomers = response.map((client: any) => ({
          id: client.client_id,
          name: client.client_name,
          email: client.email,
          phone: client.phone_number,
          alternate_phone: client.alternate_phone,
          address: client.address,
          city: client.city,
          contact_person: client.contact_person,
          country: client.country,
          state: client.state,
          pin_code: client.pin_code,
          gst_number: client.gst_number,
          pan_number: client.pan_number,
          website: client.website,
        }));
        this.customersSubject.next(mappedCustomers);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        this.errorSubject.next(error.message || 'Failed to fetch customers');
        this.loadingSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  addCustomer(customerData: Partial<Customer>): Observable<Customer> {
    return this.httpService.post<Customer>(API_ROUTES.clients, customerData).pipe(
      tap((newCustomer) => {
        const currentCustomers = this.customersSubject.value;
        this.customersSubject.next([newCustomer, ...currentCustomers]);
      }),
      catchError((error) => {
        this.errorSubject.next('Failed to add customer');
        return throwError(() => error);
      })
    );
  }

  updateCustomer(customerData: Customer): Observable<Customer> {
    return this.httpService
      .put<Customer>(API_ROUTES.clientById(customerData.id), customerData)
      .pipe(
        tap((updatedCustomer) => {
          const currentCustomers = this.customersSubject.value;
          const index = currentCustomers.findIndex((c) => c.id === customerData.id);
          if (index !== -1) {
            currentCustomers[index] = updatedCustomer;
            this.customersSubject.next([...currentCustomers]);
          }
        }),
        catchError((error) => {
          this.errorSubject.next('Failed to update customer');
          return throwError(() => error);
        })
      );
  }

  deleteCustomer(id: string): Observable<void> {
    return this.httpService.delete<void>(API_ROUTES.clientById(id)).pipe(
      tap(() => {
        const currentCustomers = this.customersSubject.value;
        this.customersSubject.next(currentCustomers.filter((c) => c.id !== id));
      }),
      catchError((error) => {
        this.errorSubject.next('Failed to delete customer');
        return throwError(() => error);
      })
    );
  }

  getCustomers(): Customer[] {
    return this.customersSubject.value;
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
