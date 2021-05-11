package nl.quintor.SimpleCalculator.web.transform;

import nl.quintor.SimpleCalculator.dao.Operator;
import nl.quintor.SimpleCalculator.dao.Precedence;
import nl.quintor.SimpleCalculator.dao.SubCalculation;
import nl.quintor.SimpleCalculator.web.dto.SubCalculationDto;

public class SubCalculationTransformer {
    public static SubCalculation toDao(SubCalculationDto subCalculationDto){
        SubCalculation subCalculation = new SubCalculation();
        subCalculation.setId(subCalculationDto.getId());
        subCalculation.setInput1(subCalculationDto.getInput1());
        subCalculation.setInput2(subCalculationDto.getInput2());
        subCalculation.setOutput(subCalculationDto.getOutput());
        subCalculation.setOperator(Operator.valueOf(subCalculationDto.getOperator()));
        subCalculation.setPrecedence(Precedence.valueOf(subCalculationDto.getPrecedence()));
        return subCalculation;
    }

    public static SubCalculationDto toDto(SubCalculation subCalculation){
        SubCalculationDto subCalculationDto = new SubCalculationDto();
        subCalculationDto.setId(subCalculation.getId());
        subCalculationDto.setInput1(subCalculation.getInput1());
        subCalculationDto.setInput2(subCalculation.getInput2());
        subCalculationDto.setOutput(subCalculation.getOutput());
        subCalculationDto.setOperator(subCalculation.getOperator().toString());
        subCalculationDto.setPrecedence(subCalculation.getPrecedence().toString());
        return subCalculationDto;
    }
}
