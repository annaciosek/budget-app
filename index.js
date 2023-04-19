let incomes = [];
let allexpenses = [];

// Variables

const incomeName = document.querySelector("#income-name"); // income input
const incomeAmount = document.querySelector("#income-amount"); // amount input
const incomeForm = document.querySelector("#income-form"); // form
const incomeList = document.querySelector(".income-list-container");
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

////////////////////////////////// 1 - Click events

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addIncome();
});

expensesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addExpenses();
});

/////////////////////////////// 2 - Income/Expense Object

const addIncome = () => {
  const incomeNameValue = incomeName.value.trim();
  const incomeAmountValue = Number(incomeAmount.value);

  if (incomeNameValue.length === 0) {
    alert("Please enter a name for your income");
    incomeName.value = "";
    return;
  }

  const incomeId = Date.now();

  const income = {
    id: incomeId,
    title: incomeNameValue,
    value: incomeAmountValue,
  };

  incomes.push(income);
  renderIncome(income);
  calcSum(incomes, incomeTotal);
  balance(incomeSum, expensesSum);

  // Clear input fields
  incomeName.value = "";
  incomeAmount.value = "";
};

const addExpenses = () => {
  const expensesNameValue = expensesName.value.trim();
  const expensesAmountValue = Number(expensesAmount.value);

  if (expensesNameValue.length === 0) {
    alert("Please enter a name for your expense");
    expensesName.value = "";
    return;
  }

  const expensesId = Date.now();

  const expenses = {
    id: expensesId,
    title: expensesNameValue,
    value: expensesAmountValue,
  };

  allexpenses.push(expenses);
  renderExpenses(expenses);
  calcSum(allexpenses, expensesTotal);
  balance(incomeSum, expensesSum);

  expensesName.value = "";
  expensesAmount.value = "";
};

//////////////////////////////////// 3 - Render Income/Expense

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

  budgetGroupEdit.appendChild(editButton);
  budgetGroupEdit.appendChild(deleteButton);
  newIncome.appendChild(budgetGroupEdit);

  //action on edit & delete
  deleteButton.addEventListener("click", (event) =>
    removeBudgetItem(event, incomes, income.id)
  );

  editButton.addEventListener("click", (event) =>
    editItem(event, income, true)
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

  budgetGroupEdit.appendChild(editButton);
  budgetGroupEdit.appendChild(deleteButton);
  newExpenses.appendChild(budgetGroupEdit);

  //action on edit & delete
  deleteButton.addEventListener("click", (event) =>
    removeBudgetItem(event, allexpenses, expenses.id)
  );
  editButton.addEventListener("click", (event) =>
    editItem(event, expenses, false)
  );
};

///////////////////////////////////// 4 - Sum of Incomes/Expenses

const calcSum = (items, type) => {
  const sum = items.reduce(
    (prevValue, currValue) => prevValue + currValue.value,
    0
  );
  type.innerText = sum;

  if (type === incomeTotal) {
    incomeSum = sum;
  } else if (type === expensesTotal) {
    expensesSum = sum;
  }
};

const balance = (incomeSum, expensesSum) => {
  total = incomeSum - expensesSum;
  if (total > 0) {
    totalBalance.innerText = `You can still spend ${total} PLN`;
  } else if (total < 0) {
    totalBalance.innerText = `Your balance is negative. You're in the negative by ${total} PLN`;
  } else {
    totalBalance.innerText = `Your balance is 0`;
  }
};

////////////////////////////////////// 5 -  Remove Btn

const removeBudgetItem = (event, type, itemId) => {
  if (type === incomes) {
    incomes = incomes.filter((item) => item.id !== itemId);
  } else if (type === allexpenses) {
    allexpenses = allexpenses.filter((item) => item.id !== itemId);
  }
  const element = event.currentTarget;
  const elementParent = element.closest(".budget-group-list");
  elementParent.remove();
  calcSum(incomes, incomeTotal);
  calcSum(allexpenses, expensesTotal);
  balance(incomeSum, expensesSum);
};

////////////////////////////////////// 5 -  Edit Btn

const editItem = (event, item, isIncome = false) => {
  const element = event.currentTarget;
  const elementParent = element.closest(".budget-group-list");
  elementParent.innerHTML = "";

  const editForm = document.createElement("form");
  editForm.classList.add("edit-form");
  const editName = document.createElement("input");
  const editAmount = document.createElement("input");
  const div = document.createElement("div");
  const editButtonSave = document.createElement("button");
  const editButtonCancel = document.createElement("button");

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
  editButtonCancel.type = "submit";
  editButtonCancel.classList.add("edit-btn");
  editButtonCancel.innerText = "✗";

  editName.value = `${item.title}`;
  editAmount.value = `${item.value}`;

  editForm.appendChild(editName);
  editForm.appendChild(editAmount);
  elementParent.appendChild(editForm);
  div.appendChild(editButtonSave);
  div.appendChild(editButtonCancel);
  elementParent.appendChild(div);

  editButtonSave.addEventListener("click", () => {
    item.title = editName.value;
    item.value = Number(editAmount.value);
    if (item.value <= 0 || isNaN(item.value)) {
      alert(
        `Please enter a positive number for ${
          isIncome ? "income" : "expenses"
        } amount`
      );
      item.value = "";
      return;
    }

    elementParent.remove();
    isIncome ? renderIncome(item) : renderExpenses(item);
    calcSum(
      isIncome ? incomes : allexpenses,
      isIncome ? incomeTotal : expensesTotal
    );
    balance(incomeSum, expensesSum);
  });

  editButtonCancel.addEventListener("click", () => {
    item.title = item.title;
    item.value = item.value;
    elementParent.remove();
    isIncome ? renderIncome(item) : renderExpenses(item);
  });
};
