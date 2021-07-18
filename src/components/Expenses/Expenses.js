import React, { useState } from "react";

import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
  const [filteredYear, setfilteredYear] = useState("2021");
  const filteredItems = props.items.filter(
    (expense) => expense.date.getFullYear().toString() === filteredYear
  );
  const expenseFilterHandler = (year) => {
    setfilteredYear(year);
  };

  return (
    <div>
      <Card className="expenses">
        <ExpensesChart expenses={filteredItems} />
        <ExpensesFilter
          selected={filteredYear}
          onFilterYear={expenseFilterHandler}
          items={props.items}
        />
        <ExpensesList items={filteredItems} />
      </Card>
    </div>
  );
};

export default Expenses;
