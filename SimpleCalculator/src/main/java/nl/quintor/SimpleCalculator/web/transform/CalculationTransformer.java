package nl.quintor.SimpleCalculator.web.transform;

import nl.quintor.SimpleCalculator.dao.Calculation;
import nl.quintor.SimpleCalculator.web.dto.CalculationDto;
import nl.quintor.SimpleCalculator.web.dto.SubCalculationDto;

import java.util.Arrays;

import static java.util.stream.Collectors.toList;

public class CalculationTransformer {
    public static Calculation ToDao(CalculationDto calculationDto){
        Calculation calculation = new Calculation();
        calculation.setId(calculationDto.getId());
        calculation.setSubCalculations(Arrays.stream(calculationDto.getSubCalculations()).map(SubCalculationTransformer::ToDao).collect(toList()));
        calculation.setOutput(calculationDto.getOutput());
        calculation.setDateOfExecution(calculationDto.getDateOfExecution());
        calculation.setError(calculationDto.getError());
        calculation.setReadableCalculation(calculationDto.getReadableCalculation());
        return calculation;
    }

    public static CalculationDto ToDto(Calculation calculation){
        CalculationDto calculationDto = new CalculationDto();
        calculationDto.setId(calculation.getId());
        calculationDto.setOutput(calculation.getOutput());
        calculationDto.setDateOfExecution(calculation.getDateOfExecution());
        calculationDto.setSubCalculations(calculation.getSubCalculations().stream().map(SubCalculationTransformer::ToDto).toArray(SubCalculationDto[]::new));
        calculationDto.setError(calculation.getError());
        calculationDto.setReadableCalculation(calculation.getReadableCalculation());
        return calculationDto;
    }
}
