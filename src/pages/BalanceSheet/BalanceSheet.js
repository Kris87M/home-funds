import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIncome, fetchRecurringBills, fetchTransactions } from 'connector';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register( ArcElement, Tooltip, Legend );

const BalanceSheet = () => {
  const dispatch = useDispatch();

  const income = useSelector(state => state.income.items);
  const recurringBills = useSelector(state => state.recurringBills.items);
  const transactions = useSelector(state => state.transactions.items);

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchRecurringBills());
    dispatch(fetchTransactions());
  }, [dispatch])

  const calculateTotal = (items) => items.reduce((sum, item) => sum + item.amount, 0);

  const totalIncome = calculateTotal(income);
  const totalRecurringBills = calculateTotal(recurringBills);
  const totalTransactions = calculateTotal(transactions);
  const netWorth = totalIncome - (totalTransactions + totalRecurringBills);

  const pieData = {
    labels: ['Pozostało', 'Bieżące wydatki', 'Stałe wydatki'],
    datasets: [
      {
        data: [netWorth, totalTransactions, totalRecurringBills],
        backgroundColor: ['#4CAF50', '#FF5722', '#FFC107'],
        hoverBackgroundColor: ['#45A049', '#E64A19', '#FFB300'],
      },
    ],
  };

return (
    <div>
      <h1>Bilans</h1> 
      {/* <p>Przychody: {totalIncome}</p>
      <p>Bieżące wydatki: {totalTransactions}</p>
      <p>Stałe wydatki: {totalRecurringBills}</p> */}
      <h3>Wartość netto: {netWorth}</h3>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default BalanceSheet
