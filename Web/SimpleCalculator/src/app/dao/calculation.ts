import { SubCalculation } from "./subCalculation";

export interface Calculation {
    id: number;
    output: number,
    dateOfExecution: Date,
    error: string,
    subCalculations: SubCalculation[];
    readableCalculation: string;
}