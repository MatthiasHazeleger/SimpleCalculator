package nl.quintor.SimpleCalculator.service;

import nl.quintor.SimpleCalculator.dao.Calculation;
import nl.quintor.SimpleCalculator.repository.CalculationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CalculationService {
    @Autowired
    private CalculationRepository calculationRepository;

    public List<Calculation> findAll(){
        return calculationRepository.findAll();
    }

    public Calculation save(Calculation calculation){
        calculation.setDateOfExecution(LocalDate.now());
        return calculationRepository.save(calculation);
    }

    public void deleteAll(){
        calculationRepository.deleteAll();
    }
}
