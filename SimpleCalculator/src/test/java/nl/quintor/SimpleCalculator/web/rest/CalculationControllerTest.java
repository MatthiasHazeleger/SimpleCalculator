package nl.quintor.SimpleCalculator.web.rest;

import nl.quintor.SimpleCalculator.dao.Calculation;
import nl.quintor.SimpleCalculator.service.CalculationParseService;
import nl.quintor.SimpleCalculator.service.CalculationService;
import nl.quintor.SimpleCalculator.service.CalculatorService;
import nl.quintor.SimpleCalculator.web.dto.CalculationDto;
import nl.quintor.SimpleCalculator.web.dto.SubCalculationDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import static org.mockito.ArgumentMatchers.any;
import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CalculationControllerTest {
    @InjectMocks
    CalculationController calculationController;

    @Mock
    CalculationService calculationServiceMock;

    @Mock
    CalculationParseService calculationParseService;

    @Mock
    CalculatorService calculatorService;

    @Test
    public void ExecuteCalculationTest(){
        String mockedCalculationString = "1 + 2 * 3";
        Calculation mockedCalculation = new Calculation();
        CalculationDto mockedCalculationDto = new CalculationDto();
        mockedCalculationDto.setSubCalculations(new SubCalculationDto[]{});
        mockedCalculationDto.setReadableCalculation(mockedCalculationString);

        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(calculationServiceMock.save(any(Calculation.class))).thenReturn(mockedCalculation);
        when(calculatorService.executeCalculation(any(Calculation.class))).thenReturn(mockedCalculation);
        when(calculationParseService.fromString(any(String.class))).thenReturn(mockedCalculation);

        CalculationDto responseBody = calculationController.executeCalculation(mockedCalculationString);

        assertThat(responseBody).isEqualTo(mockedCalculationDto);
    }
}
