import { Button, Card, Col, Row, Typography } from 'antd'
import { getIncome, getRecurringBills, getTransactions } from 'connector';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

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

  const calculateTotal = (items) => items.reduce((sum, item) => sum + item.amount, 0);

  const totalIncome = calculateTotal(income);
  const totalRecurringBills = calculateTotal(recurringBills);
  const totalTransactions = calculateTotal(transactions);

  const handleNavigate = (path) => {
    navigate(path)
  }

const getColorByValue = (value, type) => {
  if (type === 'income') {
    if (value > 2000) return 'success';
    if (value < 2000) return 'warning';
    return 'danger';
  }
  
  if (type === 'transactions') {
    if (value < 2000) return 'success';
    if (value > 4000) return 'danger';
    return 'warning';
  }

  return 'default'; // domyślny kolor, jeśli typ nie jest rozpoznany
};
  return (
    <div>
      <h1>Przegląd</h1>
      <Row gutter={16}>
    <Col span={8} >
      <Card
        title="Przychody"
        variant="borderless"
        extra={<Button onClick={() => handleNavigate('/income')}
        type={'primary'}
        >
          Szczegóły
        </Button>}
      >
        <Text
          style={{ fontSize: '24px', fontWeight: 'bold' }}
          type={getColorByValue(totalIncome, 'income')}
        >
          {totalIncome}
        </Text>
      </Card>
    </Col>
    <Col span={8}>
      <Card
        title="Stałe wydatki"
        variant="borderless"
        extra={<Button onClick={() => handleNavigate('/recurring-bills')} type='primary'
        >
          
          Szczegóły
        </Button>}>
        <Text
          style={{ fontSize: '24px', fontWeight: 'bold' }}
          type={getColorByValue(totalRecurringBills, 'recurringBills')}
        >
          {totalRecurringBills}
        </Text>
      </Card>
    </Col>
    <Col span={8}>
      <Card
        title="Bieżące wydatki "
        variant="borderless"
        extra={<Button onClick={() => handleNavigate('/transactions')} type='primary'
        >
          Szczegóły
        </Button>}>
        <Text
          style={{ fontSize: '24px', fontWeight: 'bold' }}
          type={getColorByValue(totalTransactions, 'transactions')}
        >
          {totalTransactions}
        </Text>    
      </Card>
    </Col>
  </Row>
    </div>
  )
}

export default Overview
