import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getIncome, getPots, getRecurringBills, getTransactions } from 'connector';
import { Row} from 'antd'
import OverviewCard from 'components/Cards/OverviewCard';

const calculateTotal = (items = []) => items.reduce((sum, item) => sum + item.amount, 0);

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const income = useSelector(state => state.income.items);
  const recurringBills = useSelector(state => state.recurringBills.items);
  const transactions = useSelector(state => state.transactions.items);
  const pots = useSelector(state => state.pots.items)

  const incomeStatus = useSelector(state => state.income.status);
  const billsStatus = useSelector(state => state.recurringBills.status);
  const transactionsStatus = useSelector(state => state.transactions.status);
  const potsStatus = useSelector(state => state.pots.status);

useEffect(() => {
  const actions = [
    { status: incomeStatus, fetch: getIncome },
    { status: billsStatus, fetch: getRecurringBills },
    { status: transactionsStatus, fetch: getTransactions },
    { status: potsStatus, fetch: getPots },
  ];

  actions.forEach(({ status, fetch }) => {
    if (status === 'idle') {
      dispatch(fetch());
    }
  });
}, [dispatch, incomeStatus, billsStatus, transactionsStatus, potsStatus]);

  const totalIncome = calculateTotal(income);
  const totalRecurringBills = calculateTotal(recurringBills);
  const totalTransactions = calculateTotal(transactions);
  const netWorth = totalIncome - (totalRecurringBills + totalTransactions);

  const totalSavedInPots = pots.reduce((sum, pot) => sum + pot.totalSaved, 0);

  return (
    <div>
      <h1>Przegląd</h1>
      <Row gutter={16}>
        <OverviewCard title='Przychody' total={totalIncome} type='income' onNavigate={() => navigate('/income')}/>
        <OverviewCard title='Stałe wydatki' total={totalRecurringBills} type='recurringBills' onNavigate={() => navigate('/recurring-bills')}/>
        <OverviewCard title='Bieżące wydatki' total={totalTransactions} type='transactions' onNavigate={() => navigate('/transactions')}/>
        <OverviewCard title='Bilans' total={netWorth} type='netWorth' onNavigate={() => navigate('/balance-sheet')} />
        <OverviewCard title='Skarbonki' total={totalSavedInPots} type='pots' onNavigate={() => navigate('/pots')} />
      </Row> 
    </div>
  )
}

export default Overview
