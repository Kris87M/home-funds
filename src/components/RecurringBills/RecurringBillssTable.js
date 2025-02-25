import React, { useEffect } from "react";
import { Table, Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecurringBills } from "connector";
import columns from "./column";

const RecurringBillsTable = () => {
  const dispatch = useDispatch();
  const {items, status, error} = useSelector((state) => state.recurringBills);

  useEffect(() => {
    dispatch(fetchRecurringBills());
  }, [dispatch]);

  if(status === 'loading') return <Spin size="large" style={{ display: "block", textAlign: "center", marginTop: 50 }} />
  if(status === 'failed') return <p>Błąd: {error}</p>;

  return <Table columns={columns} dataSource={items}  rowKey="id" />;
};

export default RecurringBillsTable;