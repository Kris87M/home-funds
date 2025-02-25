import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecurringBills } from 'connector';
import shortid from 'shortid';
import { Table } from 'antd';
import RecurringBillsTable from 'components/RecurringBills/RecurringBillssTable';

const RecurringBills = () => {
  return (
    <div>
      <h1>Stałe wydatki</h1>
      <RecurringBillsTable></RecurringBillsTable>
    </div>
  )
}

export default RecurringBills;
