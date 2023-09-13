import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:9000/api';

  getAllSales() {
    return this.http.get<any[]>(`${this.apiUrl}/sales`);
  }

  getSalesByProvider() {
    return this.http.get<any[]>(`${this.apiUrl}/sales`);
  }
}
