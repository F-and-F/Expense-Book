import React, { useState } from "react";
import "./NewExpense.css";
import "./ExpenseForm.css";
const NewExpense = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };
  const [enteredAmount, setEnteredAmount] = useState("");
  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };
  const [entereddate, setEnteredDate] = useState("");
  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
    console.log(e.target.value);
  };
  const [intro, setIntro] = useState(1);
  const submitHandler = (e) => {
    e.preventDefault();
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(entereddate),
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  const onClickHandler = () => {
    if (intro) setIntro(0);
    else setIntro(1);
  };

  if (intro === 1) {
    return (
      <div className="new-expense">
        <button onClick={onClickHandler}>Add Expense</button>
      </div>
    );
  }
  console.log(intro);
  if (intro === 0) {
    return (
      <div className="new-expense">
        <form onSubmit={submitHandler}>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>Title</label>
              <input
                type="text"
                value={enteredTitle}
                onChange={titleChangeHandler}
              />
            </div>
            <div className="new-expense__control">
              <label>Amount</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={enteredAmount}
                onChange={amountChangeHandler}
              />
            </div>
            <div className="new-expense__control">
              <label>Date</label>
              <input
                type="date"
                value={entereddate}
                min="2019-01-01"
                max="2022-12-31"
                onChange={dateChangeHandler}
              />
            </div>
          </div>
          <div className="new-expense__actions">
            <button onClick={onClickHandler}>Cancel</button>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      </div>
    );
  }
};
export default NewExpense;
