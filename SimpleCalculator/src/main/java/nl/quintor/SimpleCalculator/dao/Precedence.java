package nl.quintor.SimpleCalculator.dao;

public enum Precedence {
    MultiplicationAndDivision(2),
    AddingAndSubtracting(3),
    PriorityByBrackets(1);

    Precedence(int value) {
        this.value = value;
    }

    private final int value;

    public Integer GetValue(){
        return value;
    }
}