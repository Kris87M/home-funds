import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncome, updateIncome, deleteIncome } from 'connector';
import { Table, notification, Form } from 'antd';
import { columns } from './columns';
import Spinner from 'components/Spinner/Spinner';
import EditableModal from 'components/Modals/EditableModal';
import dayjs from 'dayjs';

const Income = () => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income.items);
  const status = useSelector((state) => state.income.status);
  const error = useSelector((state) => state.income.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIncome());
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

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteIncome(id))
      } catch (error) {
      console.error('Błąd podczas usuwania danych:', error);
    }
  };

  const handleSave = async () => {
    try {
      const updatedRecord = await form.validateFields();
      updatedRecord.id = currentRecord.id;
      updatedRecord.date = updatedRecord.date.format('YYYY-MM-DD');
      dispatch(updateIncome(updatedRecord));
      setIsModalOpen(false);
      setCurrentRecord(null);
    } catch (error) {
      console.error('Błąd walidacji formularza:', error);
    }
  };

  if (status === 'loading') return <Spinner />;
  if (status === 'failed') return <p>Błąd: {error}</p>;

  return (
    <div>
      <h1>Przychody</h1>
      <Table dataSource={income} columns={columns(handleEdit, handleDelete)} rowKey="id" />
      <EditableModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSave}
        form={form}
        title="Edytuj przychód"
        fields={[
          { name: 'date', label: 'Data', type: 'date', rules: [{ required: true, message: 'Wybierz datę!' }] },
          { name: 'source', label: 'Źródło dochodu', rules: [{ required: true, message: 'Wprowadź źródło dochodu!' }] },
          { name: 'amount', label: 'Kwota', type: 'number', rules: [{ required: true, message: 'Wprowadź kwotę!' }] },
        ]}
      />
    </div>
  );
};

export default Income;
