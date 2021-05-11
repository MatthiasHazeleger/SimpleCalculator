import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed} from '@angular/core/testing'
import { of } from 'rxjs';
import { CalculatorService } from '../services/calculator.service';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let mockCalculatorService: CalculatorService;

  beforeEach(async () => {

    mockCalculatorService = jasmine.createSpyObj('calculatorService', {
      deleteHistory: of(),
      calculateResult: of(),
      getCalculationHistory: of()
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CalculatorComponent ],
      providers: [
        { provide: CalculatorService, useValue: mockCalculatorService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service when the = button is clicked', () => {
    component.ScreenText = "5 + 5";
    component.calculate();
    
    expect(mockCalculatorService.calculateResult).toHaveBeenCalledWith("5 + 5");
  });

  it('should remove all info when clear all is clicked', () => {
    component.clearAll();

    expect(mockCalculatorService.deleteHistory).toHaveBeenCalled();
  });

  it('should clear the line when clear is clicked', () => {
    component.clear();

    expect(component.ScreenText).toEqual("");
    expect(component.Error).toEqual("");
    expect(component.ShowStepsTaken).toBe(false);
  });
});
