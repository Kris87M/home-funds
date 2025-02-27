import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from 'connector';
import { Table, notification } from 'antd';
import { columns } from './columns';
import Spinner from 'components/Spinner/Spinner';

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);
  const status = useSelector((state) => state.transactions.status);
  const error = useSelector((state) => state.transactions.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'failed' && error) {
      notification.error({
        message: 'Błąd pobierania danych',
        description: error,
        placement: 'topRight',
      });
    }
  }, [status, error]);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'failed') {
    return <p>Błąd: {error}</p>;
  }

  return (
    <div>
      <h1>Bieżące wydatki</h1>
      <Table dataSource={transactions} columns={columns} rowKey="id" />
    </div>
  );
}

export default Transactions;
