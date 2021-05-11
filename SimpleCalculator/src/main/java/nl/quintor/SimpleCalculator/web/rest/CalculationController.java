package nl.quintor.SimpleCalculator.web.rest;

import nl.quintor.SimpleCalculator.dao.Calculation;
import nl.quintor.SimpleCalculator.service.CalculationParseService;
import nl.quintor.SimpleCalculator.service.CalculationService;
import nl.quintor.SimpleCalculator.service.CalculatorService;
import nl.quintor.SimpleCalculator.web.dto.CalculationDto;
import nl.quintor.SimpleCalculator.web.dto.CalculationsDto;
import nl.quintor.SimpleCalculator.web.transform.CalculationTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/calculation", produces = MediaType.APPLICATION_JSON_VALUE)
public class CalculationController {
    @Autowired
    private CalculationService calculationService;

    @Autowired
    private CalculatorService calculatorService;

    @Autowired
    private CalculationParseService calculationParseService;

    @GetMapping(path = "/all")
    public @ResponseBody CalculationsDto getFullCalculationHistory(){
        CalculationsDto calculationsDto = new CalculationsDto();
        calculationsDto.setCalculationDtos(calculationService.findAll().stream().map(CalculationTransformer::toDto).toArray(CalculationDto[]::new));
        return calculationsDto;
    }

    @PostMapping
    public @ResponseBody CalculationDto executeCalculation(@RequestBody String calculationString){
        Calculation calculation = calculationParseService.fromString(calculationString);
        calculation.setReadableCalculation(calculationString);

        try {
            calculatorService.executeCalculation(calculation);
        } catch (ArithmeticException e){
            calculation.setError(e.getMessage());
            calculation.setReadableCalculation(calculation.getReadableCalculation() + " = " + e.getMessage());
        } catch (NullPointerException e){
            calculation.setError("Invalid input");
            calculation.setReadableCalculation(calculation.getReadableCalculation() + " = Invalid");
        }

        Calculation calculationResult = calculationService.save(calculation);
        return CalculationTransformer.toDto(calculationResult);
    }

    @DeleteMapping
    public void deleteCalculationHistory(){
        calculationService.deleteAll();
    }
}
