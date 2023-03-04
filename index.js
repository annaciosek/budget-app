const incomes = [];
const expenses = [];

/*
Income bedzie obiektem:
@income: 
{
    id: number;
    title: string,
    value: number;
    isCompleted: boolean,
}
*/

const incomeContainer = document.querySelector("#income-container"); // wyswietla przychod po wprowadzeniu w formularz
const incomeName = document.querySelector("#income-name"); // input a nazwą
const incomeAmount = document.querySelector("#income-amount"); // input z kwota
const incomeForm = document.querySelector("#income-form"); // caly formularz
const incomeTotal = document.querySelector("#income-total"); // suma
const totalBalance = document.querySelector("#total-balance"); // budzet w headingu
