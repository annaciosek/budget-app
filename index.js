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

// renderIncome Function
renderIncome = (income) => {
  // div for income items
  const newIncome = document.createElement("div");
  newIncome.id = `income-${income.id}`;
  newIncome.classList.add("income-list");

  // p for title and amount
  const incomeTitleAndAmount = document.createElement("p");
  incomeTitleAndAmount.classList.add("income-item");
  incomeTitleAndAmount.innerHTML = `<span>${income.title}: ${income.value} PLN</span>`;

  // 1) add title and amount to div and 2) div to the list
  newIncome.appendChild(incomeTitleAndAmount);
  incomeList.appendChild(newIncome);
};

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
  renderIncome(income);

  incomeName.value = "";
  incomeAmount.value = "";
};

incomeForm.addEventListener("submit", addIncome);
