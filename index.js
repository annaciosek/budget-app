// Arrays
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

/////////////////////////////////////////////////////////////////////////// 3
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

  /////////////////////////////////////////////////////////////////////////// 5
  // 5 - Edit & Delete btns (for both income & expenses)

  const budgetItemEdit = document.createElement("div");
  budgetItemEdit.classList.add("income-edit");

  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  deleteButton.classList.add("edit-btn");
  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";

  newIncome.appendChild(budgetItemEdit);
  budgetItemEdit.appendChild(editButton);
  budgetItemEdit.appendChild(deleteButton);

  //action on edit & delete
  deleteButton.addEventListener("click", (event) =>
    removeIncome(event, incomeId)
  );
};

/////////////////////////////////////////////////////////////////////////// 4
// 4 - Sum of incomes

const calcSum = (incomes, incomeTotal) => {
  sum = incomes
    .map((income) => Number(income.value))
    .reduce((a, b) => a + b, 0);
  incomeTotal.innerText = sum;
};

/////////////////////////////////////////////////////////////////////////// 2
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

/////////////////////////////////////////////////////////////////////////// 1
// 1 - Click event

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addIncome();
});
