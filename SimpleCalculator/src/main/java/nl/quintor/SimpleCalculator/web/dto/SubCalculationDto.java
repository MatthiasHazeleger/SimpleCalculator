package nl.quintor.SimpleCalculator.web.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SubCalculationDto {
    private Integer id;
    private Double input1;
    private Double input2;
    private Double output;
    private String operator;
    private String precedence;
}
