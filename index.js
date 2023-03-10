// Arrays
let incomes = [];
let allexpenses = [];

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

const expensesName = document.querySelector("#expenses-name"); // expenses input
const expensesAmount = document.querySelector("#expenses-amount"); // amount input
const expensesForm = document.querySelector("#expenses-form"); // form
const expensesList = document.querySelector("#expenses-list-container");
const expensesTotal = document.querySelector("#expenses-total"); // expenses sum

const totalBalance = document.querySelector("#total-balance"); // balance info

let total = 0;
let incomeSum = 0;
let expensesSum = 0;

// /////////////////////////////////////////////////////////////////////////// 6
// 6 - Remove btn function

const removeIncome = (event, itemId) => {
  incomes = incomes.filter((item) => item.id !== itemId);

  const element = event.currentTarget;
  const elementParent = element.closest(".budget-group-list");
  elementParent.remove();
  calcSum(incomes, incomeTotal);
};

const removeExpenses = (event, itemId) => {
  allexpenses = allexpenses.filter((item) => item.id !== itemId);

  const element = event.currentTarget;
  const elementParent = element.closest(".budget-group-list");
  elementParent.remove();
  calcSumExpenses(allexpenses, expensesTotal);
};
/////////////////////////////////////////////////////////////////////////// 3
// 3 - render Income & render Expenses
renderIncome = (income) => {
  // div for income items
  const newIncome = document.createElement("div");
  newIncome.id = `income-${income.id}`;
  newIncome.classList.add("budget-group-list");

  // p for title and amount
  const incomeTitleAndAmount = document.createElement("p");
  incomeTitleAndAmount.classList.add("income-item");
  incomeTitleAndAmount.innerHTML = `<span>${income.title}: ${income.value} PLN</span>`;

  // (a) add title and amount to div and (b) div to the list
  newIncome.appendChild(incomeTitleAndAmount);
  incomeList.appendChild(newIncome);

  /////////////////////////////////////////////////////////////////////////// 5
  // 5 - Edit & Delete btns

  const budgetGroupEdit = document.createElement("div");
  budgetGroupEdit.classList.add("budget-group-edit");

  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  deleteButton.classList.add("edit-btn");
  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";

  newIncome.appendChild(budgetGroupEdit);
  budgetGroupEdit.appendChild(editButton);
  budgetGroupEdit.appendChild(deleteButton);

  //action on edit & delete
  deleteButton.addEventListener("click", (event) =>
    removeIncome(event, income.id)
  );
};

renderExpenses = (expenses) => {
  const newExpenses = document.createElement("div");
  newExpenses.id = `expenses-${expenses.id}`;
  newExpenses.classList.add("budget-group-list");

  const expensesTitleAndAmount = document.createElement("p");
  expensesTitleAndAmount.classList.add("expenses-item");
  expensesTitleAndAmount.innerHTML = `<span>${expenses.title}: ${expenses.value} PLN</span>`;

  newExpenses.appendChild(expensesTitleAndAmount);
  expensesList.appendChild(newExpenses);

  // add edit & delete btn
  const budgetGroupEdit = document.createElement("div");
  budgetGroupEdit.classList.add("budget-group-edit");

  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  deleteButton.classList.add("edit-btn");
  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";

  newExpenses.appendChild(budgetGroupEdit);
  budgetGroupEdit.appendChild(editButton);
  budgetGroupEdit.appendChild(deleteButton);

  //action on edit & delete
  deleteButton.addEventListener("click", (event) =>
    removeExpenses(event, expenses.id)
  );
};

/////////////////////////////////////////////////////////////////////////// 4
// 4 - SUM of incomes / expenses

const calcSum = (incomes, incomeTotal) => {
  incomeSum = incomes
    .map((income) => Number(income.value))
    .reduce((a, b) => a + b, 0);
  incomeTotal.innerText = incomeSum;
};

const calcSumExpenses = (allexpenses, expensesTotal) => {
  expensesSum = allexpenses
    .map((expenses) => Number(expenses.value))
    .reduce((a, b) => a + b, 0);
  expensesTotal.innerText = expensesSum;
};

const balance = (incomeTotal, expensesTotal) => {
  total = incomeSum - expensesSum;
  if (total > 0) {
    totalBalance.innerText = `You can still spend ${total} PLN`;
  } else if (total < 0) {
    totalBalance.innerText = `Your balance is negative. You're in the negative by ${total} PLN`;
  } else {
    totalBalance.innerText = `Your balance is 0`;
  }
};
/////////////////////////////////////////////////////////////////////////// 2
// 2 - Create Income & Expenses object

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
  balance(incomeTotal, expensesTotal);

  // Clear input fields
  incomeName.value = "";
  incomeAmount.value = "";
};

const addExpenses = () => {
  const expensesNameValue = expensesName.value;
  const expensesAmountValue = expensesAmount.value;
  const expensesId = Date.now();

  const expenses = {
    id: expensesId,
    title: expensesNameValue,
    value: expensesAmountValue,
  };

  allexpenses.push(expenses);
  renderExpenses(expenses);
  calcSumExpenses(allexpenses, expensesTotal);
  balance(incomeTotal, expensesTotal);

  expensesName.value = "";
  expensesAmount.value = "";
};

/////////////////////////////////////////////////////////////////////////// 1
// 1 - Click event

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addIncome();
});

expensesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addExpenses();
});
