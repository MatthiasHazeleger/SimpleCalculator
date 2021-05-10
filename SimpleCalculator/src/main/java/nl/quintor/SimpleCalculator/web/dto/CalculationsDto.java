package nl.quintor.SimpleCalculator.web.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CalculationsDto {
    private CalculationDto[] calculationDtos;
}
