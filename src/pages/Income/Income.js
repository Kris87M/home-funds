import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIncome } from 'connector';
import { Table } from 'antd';
import { columns } from './columns'

const Income = () => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income.items);
  const status = useSelector((state) => state.income.status);
  const error = useSelector((state) => state.income.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIncome());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p>Ładowanie...</p>;
  }

  if (status === 'failed') {
    return <p>Błąd: {error}</p>;
  }

  return (
    <div>
      <h1>Przychody</h1>
      <Table dataSource={income} columns={columns} />
    </div>
  );
};

export default Income;
