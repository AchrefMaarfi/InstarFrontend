import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:9000/api';

  getProductsByProvider(id: string) {
    return this.http.get(`${this.apiUrl}/products/fournisseur/${id}`);
  }

  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }
  updateProduct(id: string, productData: any)  {
    return this.http.put(`${this.apiUrl}/products/${id}`, productData);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
}
