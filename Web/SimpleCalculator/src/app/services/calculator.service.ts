import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient) { }

  getCalculationHistory(): Observable<any>{
    return this.http.get(`${environment.SimpleCalcularAPI_url}/all`);
  }

  deleteHistory(): Observable<any>{
    return this.http.delete(`${environment.SimpleCalcularAPI_url}`);
  }

  calculateResult(calculation: string): Observable<any>{
    return this.http.post(`${environment.SimpleCalcularAPI_url}`, calculation);
  }
}
