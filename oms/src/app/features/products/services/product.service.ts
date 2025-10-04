import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { API_ROUTES } from '../../../core/constants/api-routes';
import { Product } from '../../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public products$ = this.productsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private httpService: HttpService) {}

  fetchProducts(): Observable<Product[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.httpService.get<Product[]>(API_ROUTES.products).pipe(
      tap((products) => {
        this.productsSubject.next(products);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        this.errorSubject.next(error.message || 'Failed to fetch products');
        this.loadingSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  addProduct(productData: Partial<Product>): Observable<Product> {
    return this.httpService.post<Product>(API_ROUTES.products, productData).pipe(
      tap((newProduct) => {
        const currentProducts = this.productsSubject.value;
        this.productsSubject.next([newProduct, ...currentProducts]);
      }),
      catchError((error) => {
        this.errorSubject.next('Failed to add product');
        return throwError(() => error);
      })
    );
  }

  updateProduct(id: string, productData: Partial<Product>): Observable<Product> {
    return this.httpService.put<Product>(API_ROUTES.productById(id), productData).pipe(
      tap((updatedProduct) => {
        const currentProducts = this.productsSubject.value;
        const index = currentProducts.findIndex((p) => p.product_id === id);
        if (index !== -1) {
          currentProducts[index] = updatedProduct;
          this.productsSubject.next([...currentProducts]);
        }
      }),
      catchError((error) => {
        this.errorSubject.next('Failed to update product');
        return throwError(() => error);
      })
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.httpService.delete<void>(API_ROUTES.productById(id)).pipe(
      tap(() => {
        const currentProducts = this.productsSubject.value;
        this.productsSubject.next(currentProducts.filter((p) => p.product_id !== id));
      }),
      catchError((error) => {
        this.errorSubject.next('Failed to delete product');
        return throwError(() => error);
      })
    );
  }

  getProducts(): Product[] {
    return this.productsSubject.value;
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
