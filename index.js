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

// Variables

const incomeName = document.querySelector("#income-name"); // income input
const incomeAmount = document.querySelector("#income-amount"); // amount input
const incomeForm = document.querySelector("#income-form"); // form
const incomeList = document.querySelector("#income-list-container");
const incomeTotal = document.querySelector("#income-total"); // income sum
const totalBalance = document.querySelector("#total-balance"); // balance info

// ---------------------------------------------------------------------- 3 ----
// 3 - renderIncome Function

renderIncome = (income) => {
  // div for income items
  const newIncome = document.createElement("div");
  newIncome.id = `income-${income.id}`;
  newIncome.classList.add("income-list");

  // p for title and amount
  const incomeTitleAndAmount = document.createElement("p");
  incomeTitleAndAmount.classList.add("income-item");
  incomeTitleAndAmount.innerHTML = `<span>${income.title}: ${income.value} PLN</span>`;

  // (a) add title and amount to div and (b) div to the list
  newIncome.appendChild(incomeTitleAndAmount);
  incomeList.appendChild(newIncome);

  //add edit & delete btns
  const incomeEdit = document.createElement("div");
  incomeEdit.classList.add("income-edit");

  const editIncome = document.createElement("button");
  const deleteIncome = document.createElement("button");
  editIncome.classList.add("edit-btn");
  deleteIncome.classList.add("edit-btn");
  editIncome.innerText = "Edit";
  deleteIncome.innerText = "Delete";

  newIncome.appendChild(incomeEdit);
  incomeEdit.appendChild(editIncome);
  incomeEdit.appendChild(deleteIncome);
};

// ---------------------------------------------------------------------- 4 ----
// 4 - Sum of incomes

const calcSum = (incomes, incomeTotal) => {
  sum = incomes
    .map((income) => Number(income.value))
    .reduce((a, b) => a + b, 0);
  incomeTotal.innerText = sum;
};

// ---------------------------------------------------------------------- 2 ----
// 2 - Create Income object

const addIncome = () => {
  const incomeNameValue = incomeName.value;
  const incomeAmountValue = incomeAmount.value;
  const incomeId = Date.now();

  const income = {
    id: incomeId,
    title: incomeNameValue,
    value: incomeAmountValue,
  };

  incomes.push(income);
  renderIncome(income);
  // Calculate sum of incomes
  calcSum(incomes, incomeTotal);

  // Clear input fields
  incomeName.value = "";
  incomeAmount.value = "";
};

// ---------------------------------------------------------------------- 1 ----
// 1 - Click event

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addIncome();
});
