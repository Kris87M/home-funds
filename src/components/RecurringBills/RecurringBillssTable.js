import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecurringBills } from "connector";
import columns from "./column";


const RecurringBillsTable = () => {
  const dispatch = useDispatch();
  const {items, status, error} = useSelector((state) => state.recurringBills);

  useEffect(() => {
    dispatch(fetchRecurringBills());
  }, [dispatch]);

  if(status === 'loading') return <p>Ładowanie...</p>;
  if(status === 'failed') return <p>Błąd: {error}</p>;

  return <Table columns={columns} dataSource={items}  rowKey="id" />;
};

export default RecurringBillsTable;