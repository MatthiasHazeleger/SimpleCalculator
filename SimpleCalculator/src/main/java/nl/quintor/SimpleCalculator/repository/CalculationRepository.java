package nl.quintor.SimpleCalculator.repository;

import nl.quintor.SimpleCalculator.dao.Calculation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalculationRepository extends JpaRepository<Calculation, Integer> {
}
