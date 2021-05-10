package nl.quintor.SimpleCalculator.service;

import nl.quintor.SimpleCalculator.dao.Calculation;
import nl.quintor.SimpleCalculator.dao.Operator;
import nl.quintor.SimpleCalculator.dao.Precedence;
import nl.quintor.SimpleCalculator.dao.SubCalculation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class CalculatorServiceTest {

    @InjectMocks
    CalculatorService calculatorService;

    @Test
    public void addShouldReturnAddedParameters(){
        double result = calculatorService.Add(10, 9);
        assertEquals(19.0, result);
    }

    @Test
    public void subtractShouldReturnSubtractedParameters(){
        double result = calculatorService.Subtract(10, 9);
        assertEquals(1.0, result);
    }

    @Test
    public void multiplyShouldReturnMultipliedParameters(){
        double result = calculatorService.Multiply(10, 9);
        assertEquals(90.0, result);
    }

    @Test
    public void divideShouldReturnDividedParameters(){
        double result = calculatorService.Divide(5, 2);
        assertEquals(2.5, result);
    }

    @Test
    public void divideShouldThrowArithmeticExceptionOnDivisionByZero(){
        assertThrows(ArithmeticException.class, () -> {
            calculatorService.Divide(5, 0);
        });
    }

    @Test
    public void isSubCalculationValidShouldReturnFalseOnInvalid(){
        SubCalculation mockedSubCalculation = new SubCalculation();
        mockedSubCalculation.setInput1(null);
        mockedSubCalculation.setInput2(null);
        boolean result = calculatorService.IsSubCalculationValid(mockedSubCalculation);

        assertFalse(result);
    }

    @Test
    public void isSubCalculationValidShouldReturnTrueOnValid(){
        SubCalculation mockedSubCalculation = new SubCalculation();
        mockedSubCalculation.setInput1(1.0);
        mockedSubCalculation.setInput2(1.0);
        boolean result = calculatorService.IsSubCalculationValid(mockedSubCalculation);

        assertTrue(result);
    }

    @Test
    public void DoubleToStringShouldReturnDotValue(){
        String result1 = calculatorService.DoubleToString(1.1);
        String result2 = calculatorService.DoubleToString(1.01);
        assertEquals("1.1",result1);
        assertEquals("1.01",result2);
    }

    @Test
    public void DoubleToStringShouldReturnNoZerosAsDecimals(){
        String result = calculatorService.DoubleToString(1.0);
        assertEquals("1",result);
    }

    @Test
    public void ExecuteSubCalculationShouldThrowOnInvalid(){
        SubCalculation mockedSubCalculation1 = new SubCalculation();
        mockedSubCalculation1.setInput1(1.0);
        mockedSubCalculation1.setInput2(null);
        SubCalculation mockedSubCalculation2 = new SubCalculation();
        mockedSubCalculation2.setInput1(null);
        mockedSubCalculation2.setInput2(1.0);

        assertThrows(NullPointerException.class, () -> {
            calculatorService.ExecuteSubCalculation(mockedSubCalculation1);
        });
        assertThrows(NullPointerException.class, () -> {
            calculatorService.ExecuteSubCalculation(mockedSubCalculation2);
        });
    }

    @Test
    public void ExecuteSubCalculationShouldSucceedOnValidAdd(){
        SubCalculation mockedSubCalculation = new SubCalculation();
        mockedSubCalculation.setInput1(1.0);
        mockedSubCalculation.setInput2(2.0);
        mockedSubCalculation.setOperator(Operator.Add);

        calculatorService.ExecuteSubCalculation(mockedSubCalculation);
        double resultAdd = mockedSubCalculation.getOutput();

        assertEquals(3.0, resultAdd);
    }

    @Test
    public void ExecuteSubCalculationShouldSucceedOnValidSubtract(){
        SubCalculation mockedSubCalculation = new SubCalculation();
        mockedSubCalculation.setInput1(1.0);
        mockedSubCalculation.setInput2(2.0);
        mockedSubCalculation.setOperator(Operator.Subtract);

        calculatorService.ExecuteSubCalculation(mockedSubCalculation);
        double resultAdd = mockedSubCalculation.getOutput();

        assertEquals(-1.0, resultAdd);
    }

    @Test
    public void ExecuteSubCalculationShouldSucceedOnValidMultiply(){
        SubCalculation mockedSubCalculation = new SubCalculation();
        mockedSubCalculation.setInput1(2.0);
        mockedSubCalculation.setInput2(2.0);
        mockedSubCalculation.setOperator(Operator.Multiply);

        calculatorService.ExecuteSubCalculation(mockedSubCalculation);
        double resultAdd = mockedSubCalculation.getOutput();

        assertEquals(4.0, resultAdd);
    }

    @Test
    public void ExecuteSubCalculationShouldSucceedOnValidDivide(){
        SubCalculation mockedSubCalculation = new SubCalculation();
        mockedSubCalculation.setInput1(2.0);
        mockedSubCalculation.setInput2(2.0);
        mockedSubCalculation.setOperator(Operator.Divide);

        calculatorService.ExecuteSubCalculation(mockedSubCalculation);
        double resultAdd = mockedSubCalculation.getOutput();

        assertEquals(1.0, resultAdd);
    }

    @Test
    public void ExecuteCalculationTest1SubCalculations(){
        Calculation mockedCalculation = new Calculation();
        SubCalculation mockedSubCalculation1 = new SubCalculation();
        mockedSubCalculation1.setOperator(Operator.Multiply);
        mockedSubCalculation1.setPrecedence(Precedence.MultiplicationAndDivision);
        mockedSubCalculation1.setInput1(2.0);
        mockedSubCalculation1.setInput2(3.0);
        mockedCalculation.setSubCalculations(List.of(mockedSubCalculation1));

        Calculation result = calculatorService.ExecuteCalculation(mockedCalculation);

        assertEquals(6.0, result.getOutput());
    }

    @Test
    public void ExecuteCalculationTest2SubCalculations(){
        Calculation mockedCalculation = new Calculation();
        SubCalculation mockedSubCalculation1 = new SubCalculation();
        mockedSubCalculation1.setOperator(Operator.Multiply);
        mockedSubCalculation1.setPrecedence(Precedence.MultiplicationAndDivision);
        mockedSubCalculation1.setInput1(2.0);
        mockedSubCalculation1.setInput2(3.0);
        SubCalculation mockedSubCalculation2 = new SubCalculation();
        mockedSubCalculation2.setPrecedence(Precedence.AddingAndSubtracting);
        mockedSubCalculation2.setOperator(Operator.Add);
        mockedSubCalculation2.setInput1(null);
        mockedSubCalculation2.setInput2(3.0);
        mockedCalculation.setSubCalculations(List.of(mockedSubCalculation1, mockedSubCalculation2));

        Calculation result = calculatorService.ExecuteCalculation(mockedCalculation);

        assertEquals(9.0, result.getOutput());
    }

    @Test
    public void ExecuteCalculationTest3SubCalculations(){
        Calculation mockedCalculation = new Calculation();
        SubCalculation mockedSubCalculation1 = new SubCalculation();
        mockedSubCalculation1.setOperator(Operator.Multiply);
        mockedSubCalculation1.setPrecedence(Precedence.MultiplicationAndDivision);
        mockedSubCalculation1.setInput1(2.0);
        mockedSubCalculation1.setInput2(3.0);
        SubCalculation mockedSubCalculation2 = new SubCalculation();
        mockedSubCalculation2.setPrecedence(Precedence.AddingAndSubtracting);
        mockedSubCalculation2.setOperator(Operator.Add);
        mockedSubCalculation2.setInput1(null);
        mockedSubCalculation2.setInput2(3.0);
        SubCalculation mockedSubCalculation3 = new SubCalculation();
        mockedSubCalculation3.setPrecedence(Precedence.AddingAndSubtracting);
        mockedSubCalculation3.setOperator(Operator.Add);
        mockedSubCalculation3.setInput1(null);
        mockedSubCalculation3.setInput2(3.0);
        mockedCalculation.setSubCalculations(List.of(mockedSubCalculation1, mockedSubCalculation2, mockedSubCalculation3));

        Calculation result = calculatorService.ExecuteCalculation(mockedCalculation);

        assertEquals(12.0, result.getOutput());
    }
}
