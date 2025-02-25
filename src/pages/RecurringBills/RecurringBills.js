import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecurringBills } from 'connector';
import shortid from 'shortid';
import { Table } from 'antd';
import RecurringBillsTable from 'components/RecurringBillssTable';

const RecurringBills = () => {
  // const dispatch = useDispatch();
  // const {items, status, error} = useSelector((state) => state.recurringBills);

  // useEffect(() => {
  //   dispatch(fetchRecurringBills());
  // }, [dispatch]);

  // if(status === 'loading') return <p>Ładowanie...</p>;
  // if(status === 'failed') return <p>Błąd: {error}</p>;

  // const columns = [
  //   {
  //     title: 'Nazwa',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Kwota',
  //     dataIndex: 'amount',
  //     key: 'amount',
  //   },
  //   {
  //     title: 'Termin płatności',
  //     dataIndex: 'dueDate',
  //     key: 'dueDate',
  //   },
  //   {
  //     title: 'Kategoria',
  //     dataIndex: 'category',
  //     key: 'category',
  //   },
  // ];

  // const data = [
  //   {
  //     key: '1',
  //     name: 'Jan Kowalski',
  //     age: 32,
  //     address: 'Warszawa, Polska',
  //   },
  //   {
  //     key: '2',
  //     name: 'Anna Nowak',
  //     age: 28,
  //     address: 'Kraków, Polska',
  //   },
  // ];

  return (
    <div>
      <h1>Stałe wydatki</h1>
      {/* <ul>
        {items.map(item => (
          <li key={shortid}>{item.id} {item.name} {item.amount} {item.dueDate} {item.category}</li>
        ))}
      </ul>
      */}
      <RecurringBillsTable></RecurringBillsTable>
    </div>
  )
}

export default RecurringBills;
