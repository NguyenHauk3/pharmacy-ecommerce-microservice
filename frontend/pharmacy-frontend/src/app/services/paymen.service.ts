import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymenService {

 private apiUrl = 'http://localhost:8080/api/vnpay';

  constructor(private http: HttpClient) { }

  createPayment(paymentRequest: any): Observable<string> {
    return this.http.post(this.apiUrl, paymentRequest,  { responseType: 'text'  as const});
  }
  
}
