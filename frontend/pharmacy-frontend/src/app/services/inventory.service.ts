import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface InventoryDTO {
  productId: number;
  quantity: number;
}

export interface InventoryForecastDTO {
  productId: number;
  productName: string;
  currentQuantity: number;
  avgExportPerDay: number;
  daysLeft: number;
  quantityToRestock: number;
}

export interface InventoryLog {
  id: number;
  productId: number;
  quantityChanged: number;
  action: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}

  getInventory(productId: number): Observable<InventoryDTO> {
    return this.http.get<InventoryDTO>(`${this.baseUrl}/${productId}`);
  }

  importInventory(productId: number, quantity: number): Observable<string> {
    const params = new HttpParams().set('productId', productId).set('quantity', quantity);
    return this.http.post(`${this.baseUrl}/import`, null, { params, responseType: 'text' });
  }

  exportInventory(productId: number, quantity: number): Observable<string> {
    const params = new HttpParams().set('productId', productId).set('quantity', quantity);
    return this.http.post(`${this.baseUrl}/export`, null, { params, responseType: 'text' });
  }

  getLowStock(): Observable<InventoryDTO[]> {
    return this.http.get<InventoryDTO[]>(`${this.baseUrl}/low-stock`);
  }

  checkStock(productId: number, quantity: number): Observable<boolean> {
    const params = new HttpParams().set('productId', productId).set('quantity', quantity);
    return this.http.get<boolean>(`${this.baseUrl}/check`, { params });
  }

  getForecast(): Observable<InventoryForecastDTO[]> {
    return this.http.get<InventoryForecastDTO[]>(`${this.baseUrl}/forecast`);
  }

  getLogs(): Observable<InventoryLog[]> {
    return this.http.get<InventoryLog[]>(`${this.baseUrl}/logs`);
  }
}
