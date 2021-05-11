package nl.quintor.SimpleCalculator.service;

import nl.quintor.SimpleCalculator.dao.Calculation;
import nl.quintor.SimpleCalculator.dao.SubCalculation;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CalculatorService {

    public double add(double i1, double i2){
        return i1 + i2;
    }

    public double subtract(double i1, double i2){
        return i1 - i2;
    }

    public double divide(double i1, double i2) throws ArithmeticException{

        if (i2 == 0.0)
        {
            throw new ArithmeticException("Division by zero");
        }

        return i1 / i2;
    }

    public double multiply(double i1, double i2){
        return i1 * i2;
    }

    /**
     * To execute a complex Calculation SubCalculations are used.
     * A SubCalculation is a simple equation with 2 inputs and 1 operator.
     * 1 or both of those inputs may be null, that means we need to use a previous outcome
     *
     * Example: "1 + 2 + 3"
     * 1. This means we have 2 SubCalculations: "1 + 2" and "null + 3"
     * 2. Check inputs on "1 + 2"
     * 3. Calculate "1 + 2" = 3
     * 4. Add 3 to the list
     * 5. Check inputs on "null + 3"
     * 6. Replace null with the latest previous outcome. That will be the 3 we just saved.
     * 7. Calculate "3 + 3" = 6
     * 8. Remove 3 from the list
     * 9. return 6 as the outcome in the Calculation object
     *
     * Example: "1 + 2 * 3"
     * 1. This means we have 2 SubCalculations: "2 * 3" and "1 + null"
     * 2. Check inputs on "2 * 3"
     * 3. Calculate "2 * 3" = 6
     * 4. Add 6 to the list
     * 5. Check inputs on "1 + null"
     * 6. Replace null with the latest previous outcome. That will be the 6 we just saved.
     * 7. Calculate "1 + 6" = 7
     * 8. Remove 6 from the list
     * 9. return 6 as the outcome in the Calculation object
     *
     * Example: "1 * 2 + 3 * 4 + 5 * 6"
     * 1. This means we have 5 SubCalculations: "1 * 2", "3 * 4", "5 * 6", "null + null" and "null + null"
     * 2. Calculate "1 * 2" = 2
     * 3. Add 2 to the list
     * 4. Calculate "3 * 4" = 12
     * 5. Add 12 to the list
     * 6. Calculate "5 * 6" = 30
     * 7. Add 30 to the list
     * 6. Check inputs on "null + null"
     * 7. Get first outcome from the list, which is 2
     * 8. Remove first outcome from the list
     * 9. replace "null + null" with "2 + null"
     * 10. Get first outcome from the list, which is 12
     * 11. Remove first outcome from the list
     * 12. replace "2 + null" with "2 + 12"
     * 13. Calculate "2 + 12" = 14
     * 14. Add 14 to the list
     * 15. Check inputs on "null + null"
     * 16. Get first outcome from the list, which is 30
     * 17. Remove first outcome from the list
     * 18. replace "null + null" with "30 + null"
     * 19. Get first outcome from the list, which is 14
     * 20. Remove first outcome from the list
     * 21. replace "30 + null" with "30 + 14"
     * 22. Calculate "30 + 14" = 44
     * 23. Add 44 to the list
     * 24. return 44 as the outcome in the Calculation object
     * @param calculation
     * @return Calculation
     * @throws ArithmeticException
     */
    public Calculation executeCalculation(Calculation calculation) throws ArithmeticException{
        // Here we save the previous outcomes of calculated SubCalculations
        // Used when a SubCalculation has 1 input that depends on a previous outcome
        List<SubCalculation> previous = new ArrayList<>();

        // Loop through the SubCalculations sorted by precedence. We first want to calculate multiplications and divisions
        calculation.getSubCalculations().stream().sorted(SubCalculation::compareTo).forEach(subCalculation -> {

            // First check if we have previous outcomes. If not we can't fill in any dependencies.
            if ((subCalculation.getInput1() == null | subCalculation.getInput2() == null) & previous.size() == 0)
                throw new ArithmeticException("Input invalid");

            // Fill a dependency at the left hand side of the equation
            else if (subCalculation.getInput1() == null & subCalculation.getInput2() != null) {

                // Get the latest outcome we know
                SubCalculation previousCalc = previous.get(previous.size() - 1);

                // Apply that outcome to the input
                subCalculation.setInput1(previousCalc.getOutput());

                // Remove the used outcome, otherwise it will interfere when we loop through them
                previous.remove(previousCalc);
            }

            // Fill a dependency at the right hand side of the equation
            else if (subCalculation.getInput2() == null & subCalculation.getInput1() != null) {
                SubCalculation previousCalc = previous.get(previous.size() - 1);
                subCalculation.setInput2(previousCalc.getOutput());
                previous.remove(previousCalc);
            }

            // Fill both inputs with previous outcomes
            else if (subCalculation.getInput1() == null & subCalculation.getInput2() == null)
            {
                subCalculation.setInput1(previous.get(0).getOutput());
                previous.remove(0);
                subCalculation.setInput2(previous.get(0).getOutput());
                previous.remove(0);
            }

            // Now that we filled the inputs we can calculate the outcome
            executeSubCalculation(subCalculation);

            previous.add(subCalculation);

            // Save the outcome in the object
            calculation.setOutput(subCalculation.getOutput());
        });
        calculation.setReadableCalculation(calculation.getReadableCalculation() + " = " + doubleToString(calculation.getOutput()));

        return calculation;
    }

    /**
     * Checks if a double has decimals, if not this functions strips the decimals
     * @param d
     * @return String
     */
    public String doubleToString(double d)
    {
        if(d == (long) d)
            return String.format("%d",(long)d);
        else
            return String.format("%s",d);
    }

    /**
     * Checks if a SubCalculation has two usable inputs
     * @param subCalculation
     * @return String
     */
    public boolean isSubCalculationValid(SubCalculation subCalculation){
        if (subCalculation.getInput1() == null & subCalculation.getInput2() == null)
            return false;
        return true;
    }

    /**
     * Calculate a simple equation's outcome, only one operator is supported by this function
     * @param subCalculation
     * @throws ArithmeticException
     */
    public void executeSubCalculation(SubCalculation subCalculation) throws ArithmeticException{
        if (!isSubCalculationValid(subCalculation))
            throw new ArithmeticException("Input invalid");

        switch (subCalculation.getOperator()){
            case Add:
                subCalculation.setOutput(add(subCalculation.getInput1(), subCalculation.getInput2()));
                break;
            case Subtract:
                subCalculation.setOutput(subtract(subCalculation.getInput1(), subCalculation.getInput2()));
                break;
            case Multiply:
                subCalculation.setOutput(multiply(subCalculation.getInput1(), subCalculation.getInput2()));
                break;
            case Divide:
                subCalculation.setOutput(divide(subCalculation.getInput1(), subCalculation.getInput2()));
                break;
        }
    }
}
