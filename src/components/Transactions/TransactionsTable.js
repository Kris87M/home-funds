import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from 'connector';
import { Table } from 'antd';
import { columns } from './columns';

const TransactionsTable = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);
  const status = useSelector((state) => state.transactions.status);
  const error = useSelector((state) => state.transactions.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p>Ładowanie...</p>;
  }

  if (status === 'failed') {
    return <p>Błąd: {error}</p>;
  }

  return <Table dataSource={transactions} columns={columns} />

}

export default TransactionsTable;

