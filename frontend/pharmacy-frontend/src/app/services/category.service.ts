import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api = `http://localhost:8080/api/category`  

  constructor(private http:HttpClient) { }

  
 getCategories(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<any>(this.api, {params});
  }



  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  add(category: FormData): Observable<any> {
    return this.http.post<any>(this.api, category);
  }

  update(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
