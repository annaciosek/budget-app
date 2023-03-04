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

const incomeName = document.querySelector("#income-name"); // income input
const incomeAmount = document.querySelector("#income-amount"); // amount input
const incomeForm = document.querySelector("#income-form"); // form
const incomeList = document.querySelector("#income-list");
const incomeTotal = document.querySelector("#income-total"); // income sum
const totalBalance = document.querySelector("#total-balance"); // balance info

const addIncome = (event) => {
  event.preventDefault();
  const incomeNameValue = incomeName.value;
  const incomeAmountValue = incomeAmount.value;
  const incomeId = Date.now();

  //Create income object
  const income = {
    id: incomeId,
    title: incomeNameValue,
    value: incomeAmountValue,
  };

  incomes.push(income);

  incomeName.value = "";
  incomeAmount.value = "";
};

incomeForm.addEventListener("submit", addIncome);
