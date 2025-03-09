import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecurringBills, addRecurringBills, updateRecurringBill, deleteRecurringBill} from 'connector';
import { Table, notification, Form, Button } from 'antd';
import Spinner from "components/Spinner/Spinner";
import { columns } from './columns';
import SearchForm from 'components/SearchForm/SearchForm';
import EditableModal from 'components/Modals/EditableModal';
import dayjs from 'dayjs';
import AddModal from 'components/Modals/AddModal';

const RecurringBills = () => {
  const dispatch = useDispatch();
  const recurringBill = useSelector((state) => state.recurringBills.items);
  const status = useSelector((state) => state.recurringBills.status);
  const error = useSelector((state) => state.recurringBills.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getRecurringBills());
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

  const filteredRecurringBill = recurringBill.filter((item) =>
    item.name?.toLowerCase().includes(searchValue?.toLowerCase()) || 
    item.amount?.toString().includes(searchValue) ||
    item.category?.toLowerCase().includes(searchValue?.toLowerCase()) 
  );

  const handleEdit = (record) => {
      setCurrentRecord(record);
      form.setFieldsValue({
        ...record,
        dueDate: dayjs(record.dueDate),
      });
      setIsModalOpen(true);
    };

  const handleDelete = (id) => {
    try {
      dispatch(deleteRecurringBill(id))
    } catch (error) {
        console.error('Błąd podczas usuwania danych:', error);
        }
      };

  const handleSave = async () => {
      try {
        const updatedRecord = await form.validateFields();
        updatedRecord.id = currentRecord.id;
        updatedRecord.dueDate = updatedRecord.dueDate.format('YYYY-MM-DD');
        dispatch(updateRecurringBill(updatedRecord));
        setIsModalOpen(false);
        setCurrentRecord(null);
      } catch (error) {
        console.error('Błąd walidacji formularza:', error);
      }
    };

  const handleAddRecurringBills = async () => {
    try {
      const newRecurringBill = await addForm.validateFields();
      newRecurringBill.dueDate = newRecurringBill.dueDate.format('YYYY-MM-DD');
      // console.log(newRecurringBill.dueDate);
      dispatch(addRecurringBills(newRecurringBill));
      setIsAddModalOpen(false);
      addForm.resetFields();
      
    } catch (error) {
      console.error('Błąd walidacji formularza:', error);
    }
  }

  if(status === 'loading') return <Spinner />
  if(status === 'failed') return <div>Błąd: {error}</div>;

  return (
    <div>
      <h1>Stałe wydatki</h1>
      <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
        <SearchForm onSearch={setSearchValue} style={{marginBottom: 8}}/>
        <Button
          type='primary'
          onClick={()=>setIsAddModalOpen(true)}
          style={{height: 40}}
        >
          Dodaj
        </Button>
      </div>
      <Table columns={columns(handleEdit, handleDelete)} dataSource={filteredRecurringBill}  rowKey="id" />
      <EditableModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSave}
        form={form}
        title='Edytuj wydatek'
        fields={[
          { name: 'name', label: 'Nazwa', type: 'text', rules: [{ required: true, message: 'Wprowadź nazwę!' }] },
          { name: 'amount', label: 'Kwota', type: 'number', rules: [{ required: true, message: 'Wprowadź kwotę!' }] },
          { name: 'dueDate', label: 'Termin płatności', type: 'date', rules: [{ required: true, message: 'Wybierz datę!' }] },
          { name: 'category', label: 'Kategoria', type: 'text', rules: [{ required: true, message: 'Wprowadź kategorię!' }] },
        ]}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onSave={handleAddRecurringBills}
        form={addForm}
        title={'Dodaj stały wydatek'}
        fields={[
          { name: 'name', label: 'Nazwa', type: 'text', rules: [{ required: true, message: 'Wprowadź nazwę!' }] },
          { name: 'amount', label: 'Kwota', type: 'number', rules: [{ required: true, message: 'Wprowadź kwotę!' }] },
          { name: 'dueDate', label: 'Termin płatności', type: 'date', rules: [{ required: true, message: 'Wprowadź termin płatności!' }] },
          { name: 'category', label: 'Kategoria', type: 'text', rules: [{ required: true, message: 'Wprowadź kategorię!' }] }
        ]}
      />
    </div>
  )
}

export default RecurringBills;
