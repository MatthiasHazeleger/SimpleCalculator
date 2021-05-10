package nl.quintor.SimpleCalculator.dao;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Calculation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToMany(fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JoinColumn(name = "calculation_id")
    private List<SubCalculation> subCalculations = new ArrayList<>();

    private Double output;

    private LocalDate dateOfExecution;

    private String error;

    private String readableCalculation;
}
