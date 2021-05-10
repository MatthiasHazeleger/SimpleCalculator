package nl.quintor.SimpleCalculator.web.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class CalculationDto {
    private Integer id;
    private SubCalculationDto[] subCalculations;
    private String readableCalculation;
    private Double output;
    private LocalDate dateOfExecution;
    private String error;
}
