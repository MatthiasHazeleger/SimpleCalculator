import { Component, OnInit } from '@angular/core';
import { Calculation } from '../dao/calculation';
import { CalculationsDto } from '../dto/calculationsDto';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  Calculations: Calculation[] = [];

  constructor(public calculatorService: CalculatorService) { }

  ScreenText: string = "";
  Error: string = "";
  ShowStepsTaken: boolean = false;
  StepsTaken: string = "";

  ngOnInit(): void {
      this.updateView();
  }

  updateView(){
    this.calculatorService.getCalculationHistory().subscribe(
      (calculationsDto: CalculationsDto) => this.Calculations = calculationsDto.calculationDtos,
      error => console.error(error)
    );
    this.clear();
  }

  addCharacter(character: string) {
    this.ScreenText += character;
    this.Error = "";
  }

  calculate(){
    let lastChar = this.ScreenText.substr(this.ScreenText.length - 1);
    if (Number(lastChar) || lastChar === "0")
      this.calculatorService.calculateResult(this.ScreenText).subscribe(
        (calculation: Calculation) => {
          this.updateView();
          this.Error = calculation.error;
        },
        error => this.Error = error
      );
  }

  clear(){
    this.ScreenText = "";
    this.Error = "";
    this.ShowStepsTaken = false;
  }

  clearAll(){
    this.clear();
    this.calculatorService.deleteHistory().subscribe(
      result => this.updateView()
    );
  }

  SetStepsTaken(calculation: Calculation){
    this.StepsTaken = "";
    calculation.subCalculations.forEach(subCalculation => {
      this.StepsTaken += "\n" + subCalculation.input1 + " " + subCalculation.operator + " " + subCalculation.input2 + " Is " + subCalculation.output;
    });
    this.ShowStepsTaken = true;
  }

}
