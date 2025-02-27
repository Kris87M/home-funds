import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecurringBills } from 'connector';
import { Table, notification } from 'antd';
import Spinner from "components/Spinner/Spinner";
import columns from './column';

const RecurringBills = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.recurringBills.items);
  const status = useSelector((state) => state.recurringBills.status);
  const error = useSelector((state) => state.recurringBills.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecurringBills());
    }
    }, [status, dispatch]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: 'Błąd pobierania danych',
        description: error,
        placement: 'topRight',
      });
    }
  }, [error]);

  if(status === 'loading') return <Spinner></Spinner>
  if(status === 'failed') return <div>Błąd: {error}</div>;
  return (
    <div>
      <h1>Stałe wydatki</h1>
      <Table columns={columns} dataSource={items}  rowKey="id" />
    </div>
  )
}

export default RecurringBills;
