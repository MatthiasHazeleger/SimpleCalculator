package nl.quintor.SimpleCalculator.service;

import nl.quintor.SimpleCalculator.dao.Calculation;
import nl.quintor.SimpleCalculator.dao.Operator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class CalculationParseServiceTest {

    @InjectMocks
    CalculationParseService calculationParseService;

    @Test
    public void GetOperatorShouldReturnCorrectOperator(){
        Operator multiply = calculationParseService.getOperator("3 * 3");
        Operator divide = calculationParseService.getOperator("3 / 3");
        Operator add = calculationParseService.getOperator("3 + 3");
        Operator subtract = calculationParseService.getOperator("3 - 3");

        assertEquals(Operator.Multiply, multiply);
        assertEquals(Operator.Divide, divide);
        assertEquals(Operator.Add, add);
        assertEquals(Operator.Subtract, subtract);
    }

    @Test
    public void GetInputValueShouldReturnFirstValue(){
        Double result = calculationParseService.getInputValue("1 + 2", 0);

        assertEquals(1.0, result);
    }

    @Test
    public void GetInputValueShouldReturnSecondValue(){
        Double result = calculationParseService.getInputValue("1 + 2", 1);

        assertEquals(2.0, result);
    }

    @Test
    public void GetInputValueShouldReturnNullOnPlaceholder(){
        Double result = calculationParseService.getInputValue("1 + " + CalculationParseService.ResultInsert, 1);

        assertNull(result);
    }

    @Test
    public void FindAddingAndSubtractingShouldReturnCorrectCalculation(){
        Calculation mockedCalculation = new Calculation();
        String result = calculationParseService.findAddingAndSubtracting(mockedCalculation, "3 * 4 + 2");

        assertEquals("3 *" + CalculationParseService.ResultInsert, result);
        assertEquals(1, mockedCalculation.getSubCalculations().size());
    }

    @Test
    public void FindMultiplicationAndDivisionShouldReturnCorrectCalculation(){
        Calculation mockedCalculation = new Calculation();
        String result = calculationParseService.findMultiplicationAndDivision(mockedCalculation, "3 * 4 + 2");

        assertEquals(CalculationParseService.ResultInsert + "+ 2", result);
        assertEquals(1, mockedCalculation.getSubCalculations().size());
    }
}
