import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../modal/Order';


export interface OrderDTO {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: any[];
}

export interface OrderReportDTO {
  date: string;
  orderCount: number;
  totalRevenue: number;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<any> {
    return this.http.post(this.baseUrl, order);
  }

   getOrdersByUserId(userId: number): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${this.baseUrl}/user/${userId}`);
  }
  createPayment(orderRequest: any) {
  return this.http.post<string>('http://localhost:8080/api/vnpay', orderRequest);
}

validatePayment(params: any) {
  return this.http.post<{success: boolean}>('http://localhost:8080/api/orders/validate-payment', params);
}
updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/status?status=${status}`, {});
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
    getAllOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(this.baseUrl); 
  }

  getOrderReportLast7Days(): Observable<OrderReportDTO[]> {
    return this.http.get<OrderReportDTO[]>(`${this.baseUrl}/report/last-7-days`);
  }

  getOrderReportLast30Days(): Observable<OrderReportDTO[]> {
    return this.http.get<OrderReportDTO[]>(`${this.baseUrl}/report/last-30-days`);
  }
}
