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

    public List<Calculation> FindAll(){
        return calculationRepository.findAll();
    }

    public Calculation Save(Calculation calculation){
        calculation.setDateOfExecution(LocalDate.now());
        return calculationRepository.save(calculation);
    }

    public void DeleteAll(){
        calculationRepository.deleteAll();
    }
}
