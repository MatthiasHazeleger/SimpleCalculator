package nl.quintor.SimpleCalculator.dao;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class SubCalculation implements Comparable<SubCalculation> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Operator operator;

    private Double input1;

    private Double input2;

    private Double output;

    private Precedence precedence;

    @Override
    public int compareTo(SubCalculation o) {
        return getPrecedence().GetValue().compareTo(o.getPrecedence().GetValue());
    }
}
