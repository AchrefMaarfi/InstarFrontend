import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:9000/api';

  getAllRequests() {
    return this.http.get<any[]>(`${this.apiUrl}/requests`);
  }

  getRequestsByProvider() {
    return this.http.get<any[]>(`${this.apiUrl}/requests`);
  }

}
