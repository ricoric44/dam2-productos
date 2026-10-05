import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private apiUrl = 'https://dummyjson.com/products';

  // Paginación en el servidor: la API devuelve "limit" productos
  // saltándose los "skip" primeros (?limit=10&skip=20 -> página 3).
  getProducts(limit = 10, skip = 0): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.apiUrl, {
      params: { limit, skip }
    });
  }
}
