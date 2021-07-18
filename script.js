"use strict";

// DOM Selectors:
const expensesList = document.querySelector(".expenses-list");
const newExpense = document.querySelector("form");
const newTitle = document.querySelector(".title");
const newAmount = document.querySelector(".amount");
const newDate = document.querySelector(".date");
const filter = document.querySelector(".year-filter");
const addExpenseBtn = document.querySelector(".add-expense-btn");
const cancelBtn = document.querySelector(".btn-cancel");
const chartContainer = document.querySelector(".chart");

// Initial Date:
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

const chartDataPoints = [
  { label: "Jan", value: 0 },
  { label: "Feb", value: 0 },
  { label: "Mar", value: 0 },
  { label: "Apr", value: 0 },
  { label: "May", value: 0 },
  { label: "Jun", value: 0 },
  { label: "Jul", value: 0 },
  { label: "Aug", value: 0 },
  { label: "Sep", value: 0 },
  { label: "Oct", value: 0 },
  { label: "Nov", value: 0 },
  { label: "Dec", value: 0 },
];

// Function:
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

const filterExpense = (year) => {
  // filtering process
  const filteredExpenses = expenses.filter(
    (expense) => expense.date.getFullYear().toString() === year
  );

  // reinitializing view and state
  expensesList.innerHTML = "";
  chartDataPoints.forEach((dataPoint) => {
    dataPoint.value = 0;
  });

  // rendering the filtered results on the page
  renderExpensesList(filteredExpenses);

  // updating chart data points
  filteredExpenses.forEach((expense) => {
    const expenseMonth = expense.date.getMonth();
    chartDataPoints[expenseMonth].value += expense.amount;
  });

  // calculating maximum amount of expenditure
  const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);
  const maxValue = Math.max(...dataPointValues);

  // rendering chart bars
  chartContainer.innerHTML = "";
  chartDataPoints.forEach((dataPoint) => {
    let barFillHeight = "0%";
    if (maxValue > 0) {
      barFillHeight = Math.round((dataPoint.value / maxValue) * 100) + "%";
    }
    const html = ` <div class="chart-bar">
                      <div class="chart-bar__inner">
                        <div
                          class="chart-bar__fill"
                          style= "height: ${barFillHeight}"
                        ></div>
                      </div>
                      <div class="chart-bar__label">${dataPoint.label}</div>
                    </div>`;
    chartContainer.insertAdjacentHTML("beforeend", html);
  });
};

const toggleWindow = () => {
  newExpense.classList.toggle("hidden");
  addExpenseBtn.classList.toggle("hidden");
};

const init = () => {
  const defaultYear = new Date().getFullYear().toString();
  filter.value = defaultYear;
  filterExpense(defaultYear);
};

// Event Handlers:
// add new Expense to the list
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

// change the year
filter.addEventListener("change", (e) => {
  const year = e.target.value;
  filterExpense(year);
});

// toggle intro window
addExpenseBtn.addEventListener("click", toggleWindow);
cancelBtn.addEventListener("click", toggleWindow);

// initialize the page
init();
