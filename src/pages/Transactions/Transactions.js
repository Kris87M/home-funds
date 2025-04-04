import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions, addTransactions, updateTransactions, deleteTransactions } from 'connector';
import { Table, notification, Form, Button } from 'antd';
import { columns } from './columns';
import Spinner from 'components/Spinner/Spinner';
import SearchForm from 'components/SearchForm/SearchForm';
import EditableModal from 'components/Modals/EditableModal';
import dayjs from 'dayjs';
import AddModal from 'components/Modals/AddModal';

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);
  const status = useSelector((state) => state.transactions.status);
  const error = useSelector((state) => state.transactions.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTransactions());
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

  const filteredTransactions = transactions.filter((item) => {
    const descriptionMatch = item.description && item.description.toLowerCase().includes(searchValue.toLowerCase());
    const amountMatch = item.amount && item.amount.toString().includes(searchValue);
    const categoryMatch = item.category && item.category.toLowerCase().includes(searchValue.toLowerCase());
    return descriptionMatch || amountMatch || categoryMatch;
  });

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
      dispatch(deleteTransactions(id))
    } catch (error) {
      console.error('Błąd podczas usuwania danych:', error);
    }
  };

  const handleSave = async () => {
    try {
      const updatedRecord = await form.validateFields();
      updatedRecord.id = currentRecord.id;
      updatedRecord.date = updatedRecord.date.format('YYYY-MM-DD');
      updatedRecord.amount = Number(updatedRecord.amount);
      dispatch(updateTransactions(updatedRecord));
      setIsModalOpen(false);
      setCurrentRecord(null);
    } catch (error) {
      console.error('Błąd walidacji formularza:', error);
    }
  };

  const handleAddTransaction = async () => {
    try {
      const newTransaction = await addForm.validateFields();
      newTransaction.date = newTransaction.date.format('YYYY-MM-DD');
      newTransaction.amount = Number(newTransaction.amount);
      dispatch(addTransactions(newTransaction));
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      console.error('Błąd walidacji formularza:', error);
    }
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'failed') {
    return <p>Błąd: {error}</p>;
  }

  return (
    <div>
      <h1>Bieżące wydatki</h1>
      <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
        <SearchForm onSearch={setSearchValue} />
        <Button
          type='primary'
          onClick={() => setIsAddModalOpen(true)}
          style={{ height: 40 }}
        >
          Dodaj
        </Button>
      </div>
      <Table dataSource={filteredTransactions} columns={columns(handleEdit, handleDelete)} rowKey="id" />
      <EditableModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSave}
        form={form}
        title='Edytuj przychód'
        fields={[
          { name: 'date', label: 'Data', type: 'date', rules: [{ required: true, message: 'Wybierz datę!' }] },
          { name: 'description', label: 'Opis', rules: [{ required: true, message: 'Wprowadź Opis!' }] },
          { name: 'amount', label: 'Kwota', type: 'number', rules: [{ required: true, message: 'Wprowadź kwotę!' }] },
          { name: 'category', label: 'Kategoria', rules: [{ required: true, message: 'Wprowadź kategorię!' }] },
        ]}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onSave={handleAddTransaction}
        form={addForm}
        title={"Dodaj kolejną transakcję"}
        fields={
          [
            { name: 'date', label: 'Data', type: 'date', rules: [{ required: true, message: 'Wybierz datę!' }] },
            { name: 'amount', label: 'Kwota', type: 'number', rules: [{ required: true, message: 'Podaj kwotę!' }] },
            { name: 'description', label: 'Opis', type: 'text', rules: [{ required: true, message: 'Dodaj opis transakcji!' }] },
            { name: 'category', label: 'Kategoria', type: 'text', rules: [{ required: true, message: 'Dodaj kategorię!'}]}
          ]
        }
      />
    </div>
  );
}

export default Transactions;
