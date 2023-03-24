/*
Income bedzie obiektem:
@income: 
{
    id: number;
    title: string,
    value: number;
}
*/

// Arrays

let incomes = [];
let allexpenses = [];

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

////////////////////////////////////////////////////////////////////////////////////// 1 - Click events

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addIncome();
});

expensesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addExpenses();
});

////////////////////////////////////////////////////////////////////////////////////// 2 - Income/Expense Object

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
  calcSum(incomes, incomeTotal); // Calculate sum of incomes
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

////////////////////////////////////////////////////////////////////////////////////// 3 - Render Income/Expense

renderIncome = (income) => {
  const newIncome = document.createElement("div"); // div for income items
  newIncome.id = `income-${income.id}`;
  newIncome.classList.add("budget-group-list");

  const incomeTitleAndAmount = document.createElement("p"); // p for title and amount
  incomeTitleAndAmount.classList.add("income-item");
  incomeTitleAndAmount.innerHTML = `<span>${income.title}: ${income.value} PLN</span>`;

  newIncome.appendChild(incomeTitleAndAmount); // add title and amount to div
  incomeList.appendChild(newIncome); // add div to the list

  // Edit & Delete btns

  const budgetGroupEdit = document.createElement("div");
  budgetGroupEdit.classList.add("budget-group-edit");

  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  deleteButton.classList.add("edit-btn");
  editButton.classList.add("edit-btn");
  deleteButton.innerText = "Delete";
  editButton.innerText = "Edit";

  newIncome.appendChild(budgetGroupEdit);
  budgetGroupEdit.appendChild(editButton);
  budgetGroupEdit.appendChild(deleteButton);

  //action on edit & delete
  deleteButton.addEventListener("click", (event) =>
    removeIncome(event, income.id)
  );
  editButton.addEventListener("click", (event) => editIncome(event, income));
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

  // add delete btn
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
  editButton.addEventListener("click", (event) =>
    editExpenses(event, expenses)
  );
};

////////////////////////////////////////////////////////////////////////////////////// 4 - Sum of Incomes/Expenses

const calcSum = (incomes, incomeTotal) => {
  incomeSum = incomes
    .map((income) => Number(income.value))
    .reduce((prevValue, currValue) => prevValue + currValue, 0);
  incomeTotal.innerText = incomeSum;
};

const calcSumExpenses = (allexpenses, expensesTotal) => {
  expensesSum = allexpenses
    .map((expenses) => Number(expenses.value))
    .reduce((prevValue, currValue) => prevValue + currValue, 0);
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

////////////////////////////////////////////////////////////////////////////////////// 5 -  Remove Btn

const removeIncome = (event, itemId) => {
  incomes = incomes.filter((item) => item.id !== itemId); // removes from array

  const element = event.currentTarget;
  const elementParent = element.closest(".budget-group-list");
  elementParent.remove();
  calcSum(incomes, incomeTotal);
  balance(incomeTotal, expensesTotal);
};

const removeExpenses = (event, itemId) => {
  allexpenses = allexpenses.filter((item) => item.id !== itemId);

  const element = event.currentTarget;
  const elementParent = element.closest(".budget-group-list");
  elementParent.remove();
  calcSumExpenses(allexpenses, expensesTotal);
  balance(incomeTotal, expensesTotal);
};

////////////////////////////////////////////////////////////////////////////////////// 5 -  Edit Btn

const editIncome = (event, income) => {
  const element = event.currentTarget;
  const elementParent = element.closest(".budget-group-list");
  elementParent.innerHTML = "";

  const editForm = document.createElement("form");
  editForm.classList.add("edit-form");
  const editName = document.createElement("input");
  const editAmount = document.createElement("input");
  const div = document.createElement("div");
  const editButtonSave = document.createElement("button");

  div.classList.add("edit-btns");
  editName.classList.add("form-input");
  editName.setAttribute("name", "editName");
  editName.setAttribute("type", "text");
  editName.classList.add("form-input");
  editAmount.classList.add("form-input");
  editAmount.setAttribute("name", "editAmount");
  editAmount.setAttribute("type", "number");
  editAmount.setAttribute("step", "0.01");
  editAmount.setAttribute("min", "0.01");
  editButtonSave.type = "submit";
  editButtonSave.classList.add("edit-btn");
  editButtonSave.innerText = "✓";

  editName.value = `${income.title}`;
  editAmount.value = `${income.value}`;

  editForm.appendChild(editName);
  editForm.appendChild(editAmount);
  elementParent.appendChild(editForm);
  div.appendChild(editButtonSave);
  elementParent.appendChild(div);

  editButtonSave.addEventListener("click", () => {
    income.title = editName.value;
    income.value = editAmount.value;
    elementParent.remove();
    renderIncome(income);
    calcSum(incomes, incomeTotal);
    balance(incomeTotal, expensesTotal);
  });
};

const editExpenses = (event, expenses) => {
  const element = event.currentTarget;
  const elementParent = element.closest(".budget-group-list");
  elementParent.innerHTML = "";

  const editForm = document.createElement("form");
  editForm.classList.add("edit-form");
  const editName = document.createElement("input");
  const editAmount = document.createElement("input");
  const div = document.createElement("div");
  const editButtonSave = document.createElement("button");

  div.classList.add("edit-btns");
  editName.classList.add("form-input");
  editName.setAttribute("name", "editName");
  editName.setAttribute("type", "text");
  editName.classList.add("form-input");
  editAmount.classList.add("form-input");
  editAmount.setAttribute("name", "editAmount");
  editAmount.setAttribute("type", "number");
  editAmount.setAttribute("step", "0.01");
  editAmount.setAttribute("min", "0.01");
  editButtonSave.type = "submit";
  editButtonSave.classList.add("edit-btn");
  editButtonSave.innerText = "✓";

  editName.value = `${expenses.title}`;
  editAmount.value = `${expenses.value}`;

  editForm.appendChild(editName);
  editForm.appendChild(editAmount);
  elementParent.appendChild(editForm);
  div.appendChild(editButtonSave);
  elementParent.appendChild(div);

  editButtonSave.addEventListener("click", () => {
    expenses.title = editName.value;
    expenses.value = editAmount.value;
    elementParent.remove();
    renderExpenses(expenses);
    calcSumExpenses(allexpenses, expensesTotal);
    balance(expensesTotal, expensesTotal);
  });
};
