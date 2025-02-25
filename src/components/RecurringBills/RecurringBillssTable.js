import React, { useEffect } from "react";
import { Table, Spin, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecurringBills } from "connector";
import columns from "./column";

const RecurringBillsTable = () => {
  const dispatch = useDispatch();
  const {items, status, error} = useSelector((state) => state.recurringBills);

  useEffect(() => {
    dispatch(fetchRecurringBills());
  }, [dispatch]);
  
  useEffect(() => {
    if (error) {
      notification.error({
        message: 'Błąd pobierania danych',
        description: error,
        placement: 'topRight',
      });
    }
  }, [error]);

  if(status === 'loading') return <Spin size="large" style={{ display: "block", textAlign: "center", marginTop: 50 }} />
  if(status === 'failed') return <div>Błąd: {error}</div>;

  return <Table columns={columns} dataSource={items}  rowKey="id" />;
};

export default RecurringBillsTable;