import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIncome, updateIncome, deleteIncome } from 'connector';
import { Table, Form, Button } from 'antd';
import { columns } from './columns';
import EditableModal from 'components/Modals/EditableModal';
import SearchForm from 'components/SearchForm/SearchForm';
import AddModal from 'components/Modals/AddModal';
import dayjs from 'dayjs';

const Income = () => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income.items);
  const error = useSelector((state) => state.income.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');

  const filteredIncome = income.filter((item) =>
    item.source.toLowerCase().includes(searchValue.toLowerCase()) || 
    item.amount.toString().includes(searchValue)
  );

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
      dispatch(deleteIncome(id));
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
      dispatch(updateIncome(updatedRecord));
      setIsModalOpen(false);
      setCurrentRecord(null);
    } catch (error) {
      console.error('Błąd walidacji formularza:', error);
    }
  };

  const handleAddIncome = async () => {
    try {
      const newIncome = await addForm.validateFields();
      newIncome.date = newIncome.date.format('YYYY-MM-DD');
      newIncome.amount = Number(newIncome.amount);
      dispatch(addIncome(newIncome));
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      console.error('Błąd walidacji formularza:', error);
    }
  };

  return (
    <div>
      <h1>Przychody</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <SearchForm onSearch={setSearchValue} />
        <Button 
          type="primary" 
          onClick={() => setIsAddModalOpen(true)} 
          style={{ height: 40 }}
        >
          Dodaj
        </Button>
      </div>
      <Table
        dataSource={filteredIncome}
        columns={columns(handleEdit, handleDelete)}
        rowKey='id'
      />
      <EditableModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSave}
        form={form}
        title='Edytuj przychód'
        fields={[
          { name: 'date', label: 'Data', type: 'date', rules: [{ required: true, message: 'Wybierz datę!' }] },
          { name: 'source', label: 'Źródło dochodu', rules: [{ required: true, message: 'Wprowadź źródło dochodu!' }] },
          { name: 'amount', label: 'Kwota', type: 'number', rules: [{ required: true, message: 'Wprowadź kwotę!' }] },
        ]}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onSave={handleAddIncome}
        form={addForm}
        title="Dodaj nowy przychód"
        fields={[
          { name: 'date', label: 'Data', type: 'date', rules: [{ required: true, message: 'Wybierz datę!' }] },
          { name: 'source', label: 'Źródło dochodu', type: 'text', rules: [{ required: true, message: 'Wprowadź źródło dochodu!' }] },
          { name: 'amount', label: 'Kwota', type: 'number', rules: [{ required: true, message: 'Wprowadź kwotę!' }] },
        ]}
      />
    </div>
  );
};

export default Income;
