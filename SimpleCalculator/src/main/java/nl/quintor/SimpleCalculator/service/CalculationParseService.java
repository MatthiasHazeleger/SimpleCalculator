package nl.quintor.SimpleCalculator.service;

import nl.quintor.SimpleCalculator.dao.Calculation;
import nl.quintor.SimpleCalculator.dao.Operator;
import nl.quintor.SimpleCalculator.dao.Precedence;
import nl.quintor.SimpleCalculator.dao.SubCalculation;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CalculationParseService {

    public static final String ResultInsert = "RESULT";
    public static final String AnyNumberRegex = "(?<![\\d\\w])\\-?[" + ResultInsert + "\\d\\.\\,\\s]+";

    /**
     * Converts a string to a Calculation
     * @param calculationString
     * @return Calculation
     */
    public Calculation FromString(String calculationString){
        Calculation calculation = new Calculation();
        calculationString = FindMultiplicationAndDivision(calculation, calculationString);
        FindAddingAndSubtracting(calculation, calculationString);
        return calculation;
    }

    /**
     * Searches for digit followed by a * or / followed by a digit adds the found SubCalculation to the Calculation and returns the substring
     * @param calculation
     * @param calculationString
     * @return String
     */
    public String FindMultiplicationAndDivision(Calculation calculation, String calculationString){
        String regex = AnyNumberRegex + "[\\*\\/]" + AnyNumberRegex;
        return FindAndReplaceCalculations(calculation, Precedence.MultiplicationAndDivision, regex, calculationString);
    }

    /**
     * Searches for digit followed by a + or - followed by a digit adds the found SubCalculation to the Calculation and returns the substring
     * @param calculation
     * @param calculationString
     * @return String
     */
    public String FindAddingAndSubtracting(Calculation calculation, String calculationString){
        String regex = AnyNumberRegex + "[\\+\\-]" + AnyNumberRegex;
        return FindAndReplaceCalculations(calculation, Precedence.AddingAndSubtracting, regex, calculationString);
    }

    /**
     * Searches for a regex and returns that substring if a SubCalculation is found then add it to the given Calculation
     * @param calculation
     * @param precedence
     * @param regex
     * @param calculationString
     * @return String
     */
    public String FindAndReplaceCalculations(Calculation calculation, Precedence precedence, String regex, String calculationString){
        String match = GetMatch(regex, calculationString, 0);
        while(match != null){
            SubCalculation newSubCalculation = AddNewSubCalculation(
                    calculation,
                    precedence,
                    GetOperator(match),
                    GetInputValue(match, 0),
                    GetInputValue(match, 1)
            );
            calculationString = calculationString.replaceFirst(regex, ResultInsert);
            match = GetMatch(regex, calculationString, 0);
        }
        return calculationString;
    }

    /**
     * Return the found value at group(index) or null if nothing is found at that index
     * @param regex
     * @param searchString
     * @param index
     * @return String
     */
    public String GetMatch(String regex, String searchString, int index){
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(searchString);
        List<String> result = new ArrayList<>();
        if(m.find()){
            result.add(m.group());
            while(m.find()) {
                result.add(m.group());
            }
            return result.get(index);
        }
        return null;
    }

    public Double GetInputValue(String searchString, int index){
        String match = GetMatch(AnyNumberRegex, searchString, index);

        if (match == null || match.contains(ResultInsert))
            return null;

        return Double.parseDouble(match);
    }

    public Operator GetOperator(String searchString){
        if (searchString.contains("*"))
            return Operator.Multiply;
        else if (searchString.contains("/"))
            return Operator.Divide;
        else if (searchString.contains("+"))
            return Operator.Add;
        else
            return Operator.Subtract;
    }

    public SubCalculation AddNewSubCalculation(Calculation calculation, Precedence precedence, Operator operator, Double input1, Double input2){
        List<SubCalculation> subCalculations = calculation.getSubCalculations();
        SubCalculation newSubCalculation = new SubCalculation();
        newSubCalculation.setInput1(input1);
        newSubCalculation.setInput2(input2);
        newSubCalculation.setOperator(operator);
        newSubCalculation.setPrecedence(precedence);
        subCalculations.add(newSubCalculation);
        calculation.setSubCalculations(subCalculations);
        return newSubCalculation;
    }

}
