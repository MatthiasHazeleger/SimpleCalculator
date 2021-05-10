import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CalculatorService } from './calculator.service';
import { environment } from 'src/environments/environment';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to delete the history', () => {
    service.deleteHistory().subscribe();

    const http = httpMock.expectOne(`${environment.SimpleCalcularAPI_url}`);
    expect(http.request.method).toBe('DELETE');
    expect(http.request.body).toBeNull();
  });

  it('should be able to get the calculation history', () => {
    const response = [{}];

    service.getCalculationHistory().subscribe(res => {
      expect(res).toBe(response)
    });

    const http = httpMock.expectOne(`${environment.SimpleCalcularAPI_url}/all`);
    expect(http.request.method).toBe('GET');
    expect(http.request.body).toBeNull();
    http.flush(response);
  });

  it('should be able to get the calculation result', () => {
    const response = "25";
    const calculationString = "5 + 5";
    const mockCalculationResult = "5 + 5";

    service.calculateResult(calculationString).subscribe(res => {
      expect(res).toEqual(response)
    });

    const http = httpMock.expectOne(`${environment.SimpleCalcularAPI_url}`);
    expect(http.request.method).toBe('POST');
    expect(http.request.body).toEqual(mockCalculationResult);
    http.flush(response);
  });
});
