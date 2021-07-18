"use strict";
const expensesList = document.querySelector(".expenses-list");
const newExpense = document.querySelector("form");
const newTitle = document.querySelector(".title");
const newAmount = document.querySelector(".amount");
const newDate = document.querySelector(".date");
const filter = document.querySelector(".year-filter");

const expenses = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const renderExpensesList = (expenses) => {
  const html = expenses
    .map((expense) => {
      const month = expense.date.toLocaleString("en-US", { month: "long" });
      const day = expense.date.toLocaleString("en-US", { day: "2-digit" });
      const year = expense.date.getFullYear();
      return `<li>
            <div class="expense-item">
                <div class="expense-date">
                    <div class="expense-date__month">${month}</div>
                    <div class="expense-date__year">${year}</div>
                    <div class="expense-date__day">${day}</div>
                </div>
                <div class="expense-item__description">
                    <h2>${expense.title}</h2>
                    <div class="expense-item__price">${expense.amount}</div>
                </div> 
            </div>
          </li>`;
    })
    .join("");
  expensesList.insertAdjacentHTML("afterbegin", html);
};

// Add new Expense to the list
newExpense.addEventListener("submit", (e) => {
  e.preventDefault();
  const expenseData = {
    title: newTitle.value,
    amount: newAmount.value,
    date: new Date(newDate.value),
  };
  expenses.unshift(expenseData);
  filterExpense(filter.value);
});

const filterExpense = (year) => {
  const filterExpenses = expenses.filter(
    (expense) => expense.date.getFullYear().toString() === year
  );
  expensesList.innerHTML = "";
  renderExpensesList(filterExpenses);
};

filter.addEventListener("change", (e) => {
  const year = e.target.value;
  filterExpense(year);
});

const init = () => {
  const defaultYear = new Date().getFullYear().toString();
  filter.value = defaultYear;
  filterExpense(defaultYear);
};

init();
