import { Injectable  } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../modal/Product';



@Injectable({
  providedIn: 'root'  
})
export class ProductService {

  private apiUrl = `http://localhost:8080/api/products`;
  constructor(private http: HttpClient) {}

   private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

   getProductsWithDiscount(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/with-discount?page=${page}&size=${size}`);
  }

  getAll(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<any>(this.apiUrl,{headers: this.getHeaders(), params});
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {headers: this.getHeaders()});
  }

  add(product: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, product, {headers: this.getHeaders()});
  }

  update(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data,{headers: this.getHeaders()});
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`,{headers: this.getHeaders()});
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}`);
}

getProductsByPromotion(): Observable<any>{
  return this.http.get<any[]>(`${this.apiUrl}/promotion`);

}

  searchProducts(params: any, page: number, size: number, sort: string): Observable<any> {
    // Chuyển đổi params thành đối tượng JSON và thêm các tham số phân trang
    const body = {
      ...params,
      page,
      size,
      sort
    };
  
    return this.http.post<any>(`${this.apiUrl}/search`, body,{headers: this.getHeaders()});
  }

}
