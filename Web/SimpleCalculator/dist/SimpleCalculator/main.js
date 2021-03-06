(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Documents\Quintor\Projects\SimpleCalculator\Web\SimpleCalculator\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    SimpleCalcularAPI_url: 'http://localhost:8081/calculation'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "LkI3":
/*!****************************************************!*\
  !*** ./src/app/calculator/calculator.component.ts ***!
  \****************************************************/
/*! exports provided: CalculatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalculatorComponent", function() { return CalculatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_calculator_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/calculator.service */ "S5i5");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");



function CalculatorComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_div_4_Template_span_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["????restoreView"](_r5); const calculation_r3 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"](); return ctx_r4.SetStepsTaken(calculation_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](3, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const calculation_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](calculation_r3.readableCalculation);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](calculation_r3.dateOfExecution);
} }
function CalculatorComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](ctx_r1.Error);
} }
function CalculatorComponent_div_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](ctx_r2.StepsTaken);
} }
class CalculatorComponent {
    constructor(calculatorService) {
        this.calculatorService = calculatorService;
        this.Calculations = [];
        this.ScreenText = "";
        this.Error = "";
        this.ShowStepsTaken = false;
        this.StepsTaken = "";
    }
    ngOnInit() {
        this.updateView();
    }
    updateView() {
        this.calculatorService.getCalculationHistory().subscribe((calculationsDto) => this.Calculations = calculationsDto.calculationDtos, error => console.error(error));
        this.clear();
    }
    addCharacter(character) {
        this.ScreenText += character;
        this.Error = "";
    }
    calculate() {
        let lastChar = this.ScreenText.substr(this.ScreenText.length - 1);
        if (Number(lastChar) || lastChar === "0")
            this.calculatorService.calculateResult(this.ScreenText).subscribe((calculation) => {
                this.updateView();
                this.Error = calculation.error;
            }, error => this.Error = error);
    }
    clear() {
        this.ScreenText = "";
        this.Error = "";
        this.ShowStepsTaken = false;
    }
    clearAll() {
        this.clear();
        this.calculatorService.deleteHistory().subscribe(result => this.updateView());
    }
    SetStepsTaken(calculation) {
        this.StepsTaken = "";
        calculation.subCalculations.forEach(subCalculation => {
            this.StepsTaken += "\n" + subCalculation.input1 + " " + subCalculation.operator + " " + subCalculation.input2 + " Is " + subCalculation.output;
        });
        this.ShowStepsTaken = true;
    }
}
CalculatorComponent.??fac = function CalculatorComponent_Factory(t) { return new (t || CalculatorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????directiveInject"](_services_calculator_service__WEBPACK_IMPORTED_MODULE_1__["CalculatorService"])); };
CalculatorComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: CalculatorComponent, selectors: [["app-calculator"]], decls: 56, vars: 4, consts: [[1, "card"], [1, "card-body"], [1, "card-title"], ["class", "li", 4, "ngFor", "ngForOf"], ["class", "alert alert-danger", 4, "ngIf"], [1, "btn", "btn-lg", "btn-dark", "btn-rectangle", 3, "click"], [1, "btn", "btn-lg", "btn-primary", "btn-square", 3, "click"], [1, "btn", "btn-lg", "btn-info", "btn-square", 3, "click"], [1, "btn", "btn-lg", "btn-danger", "btn-square", 3, "click"], ["class", "stepsTaken", 4, "ngIf"], [1, "li"], [1, "calculation", 3, "click"], [1, "date"], [1, "alert", "alert-danger"], [1, "stepsTaken"]], template: function CalculatorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](2, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](3, "Simple Calculator");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](4, CalculatorComponent_div_4_Template, 5, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](5, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](7, CalculatorComponent_div_7_Template, 2, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](8, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_8_listener() { return ctx.clear(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](9, "Clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](10, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_10_listener() { return ctx.clearAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](11, "Clear All");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](12, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](13, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_13_listener() { return ctx.addCharacter("1"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](14, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](15, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_15_listener() { return ctx.addCharacter("2"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](16, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](17, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_17_listener() { return ctx.addCharacter("3"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](18, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](19, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_19_listener() { return ctx.addCharacter("+"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](20, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](21, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](22, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_22_listener() { return ctx.addCharacter("4"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](23, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](24, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_24_listener() { return ctx.addCharacter("5"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](25, "5");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](26, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_26_listener() { return ctx.addCharacter("6"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](27, "6");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](28, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_28_listener() { return ctx.addCharacter("-"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](29, "-");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](30, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](31, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_31_listener() { return ctx.addCharacter("7"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](32, "7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](33, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_33_listener() { return ctx.addCharacter("8"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](34, "8");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](35, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_35_listener() { return ctx.addCharacter("9"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](36, "9");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](37, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_37_listener() { return ctx.addCharacter("*"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](38, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](39, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](40, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_40_listener() { return ctx.addCharacter("0"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](41, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](42, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_42_listener() { return ctx.addCharacter("."); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](43, ".");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](44, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_44_listener() { return ctx.calculate(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](45, "=");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](46, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????listener"]("click", function CalculatorComponent_Template_button_click_46_listener() { return ctx.addCharacter("/"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](47, "/");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](48, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](49, "Tip:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](50, " Feel free to add more than one operator to the equation.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](51, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementStart"](52, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](53, "Tip:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????text"](54, " Click on a calculation to see the steps taken by the calculator. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????template"](55, CalculatorComponent_div_55_Template, 2, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????elementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngForOf", ctx.Calculations);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????textInterpolate"](ctx.ScreenText);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", ctx.Error);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????advance"](48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????property"]("ngIf", ctx.ShowStepsTaken);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], styles: [".btn-square[_ngcontent-%COMP%] {\r\n    width: 75px;\r\n    height: 75px;\r\n    border-radius: 0;\r\n}\r\n\r\n.btn-rectangle[_ngcontent-%COMP%] {\r\n    width: 150px;\r\n    height: 75px;\r\n    border-radius: 0;\r\n}\r\n\r\n.li[_ngcontent-%COMP%] {\r\n    list-style: none;\r\n    width: 300px;\r\n}\r\n\r\n.date[_ngcontent-%COMP%] {\r\n    color: grey;\r\n    position: absolute;\r\n    left: 320px;\r\n}\r\n\r\n.calculation[_ngcontent-%COMP%]:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.stepsTaken[_ngcontent-%COMP%] {\r\n    white-space: pre-line;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3IuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsV0FBVztBQUNmOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6QiIsImZpbGUiOiJjYWxjdWxhdG9yLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYnRuLXNxdWFyZSB7XHJcbiAgICB3aWR0aDogNzVweDtcclxuICAgIGhlaWdodDogNzVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDA7XHJcbn1cclxuXHJcbi5idG4tcmVjdGFuZ2xlIHtcclxuICAgIHdpZHRoOiAxNTBweDtcclxuICAgIGhlaWdodDogNzVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDA7XHJcbn1cclxuXHJcbi5saSB7XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG59XHJcblxyXG4uZGF0ZSB7XHJcbiAgICBjb2xvcjogZ3JleTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDMyMHB4O1xyXG59XHJcblxyXG4uY2FsY3VsYXRpb246aG92ZXIge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uc3RlcHNUYWtlbiB7XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "S5i5":
/*!************************************************!*\
  !*** ./src/app/services/calculator.service.ts ***!
  \************************************************/
/*! exports provided: CalculatorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalculatorService", function() { return CalculatorService; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class CalculatorService {
    constructor(http) {
        this.http = http;
    }
    getCalculationHistory() {
        return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].SimpleCalcularAPI_url}/all`);
    }
    deleteHistory() {
        return this.http.delete(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].SimpleCalcularAPI_url}`);
    }
    calculateResult(calculation) {
        return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].SimpleCalcularAPI_url}`, calculation);
    }
}
CalculatorService.??fac = function CalculatorService_Factory(t) { return new (t || CalculatorService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["????inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
CalculatorService.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["????defineInjectable"]({ token: CalculatorService, factory: CalculatorService.??fac, providedIn: 'root' });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculator/calculator.component */ "LkI3");


class AppComponent {
    constructor() {
        this.title = 'SimpleCalculator';
    }
}
AppComponent.??fac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](0, "app-calculator");
    } }, directives: [_calculator_calculator_component__WEBPACK_IMPORTED_MODULE_1__["CalculatorComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./calculator/calculator.component */ "LkI3");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _services_calculator_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/calculator.service */ "S5i5");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class AppModule {
}
AppModule.??fac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["????defineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["????defineInjector"]({ providers: [
        _services_calculator_service__WEBPACK_IMPORTED_MODULE_5__["CalculatorService"]
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["????setNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_3__["CalculatorComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]] }); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const routes = [];
class AppRoutingModule {
}
AppRoutingModule.??fac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["????defineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["????defineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["????setNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map