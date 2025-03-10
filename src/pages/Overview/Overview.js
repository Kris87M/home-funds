import { Row} from 'antd'
import { getIncome, getRecurringBills, getTransactions } from 'connector';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import OverviewCard from 'components/Cards/OverviewCard';

const calculateTotal = (items) => items.reduce((sum, item) => sum + item.amount, 0);

const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const income = useSelector(state => state.income.items);
  const recurringBills = useSelector(state => state.recurringBills.items);
  const transactions = useSelector(state => state.transactions.items);

  useEffect(() => {
    dispatch(getIncome());
    dispatch(getRecurringBills());
    dispatch(getTransactions());
  }, [dispatch])

  const totalIncome = calculateTotal(income);
  const totalRecurringBills = calculateTotal(recurringBills);
  const totalTransactions = calculateTotal(transactions);
  const netWorth = totalIncome - (totalRecurringBills + totalTransactions);

  return (
    <div>
      <h1>Przegląd</h1>
      <Row gutter={16}>
        <OverviewCard title='Przychody' total={totalIncome} type='income' onNavigate={() => navigate('/income')}/>
        <OverviewCard title='Stałe wydatki' total={totalRecurringBills} type='recurringBills' onNavigate={() => navigate('/recurring-bills')}/>
        <OverviewCard title='Bieżące wydatki' total={totalTransactions} type='transactions' onNavigate={() => navigate('/transactions')}/>
        <OverviewCard title='Bilans' total={netWorth} type='netWorth' onNavigate={() => navigate('/balance-sheet')}/>
      </Row> 
    </div>
  )
}

export default Overview
