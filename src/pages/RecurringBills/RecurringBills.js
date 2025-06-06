import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecurringBills, updateRecurringBill, deleteRecurringBill} from 'connector';
import { Table, Form, Button, Tooltip } from 'antd';
import { columns } from '../../columns/recurringBillsColumns';
import { useFilteredData } from 'hooks/useFiltredData';
import { copyBillsFromPreviousMonth } from 'store/thunks/copyThunks';
import { billsFields } from 'config/modalsFields';
import AddModal from 'components/Modals/AddModal';
import EditableModal from 'components/Modals/EditableModal';
import SearchForm from 'components/SearchForm/SearchForm';
import dayjs from 'dayjs';

const RecurringBills = () => {
  const dispatch = useDispatch();
  const { recurringBills } = useFilteredData();
  const selectedMonth = useSelector(state => state.month.selectedMonth)
  const error = useSelector((state) => state.recurringBills.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');

  const filteredRecurringBill = recurringBills.filter((item) =>
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
        updatedRecord.amount = Number(updatedRecord.amount);
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
      newRecurringBill.amount = Number(newRecurringBill.amount);
      dispatch(addRecurringBills(newRecurringBill));
      setIsAddModalOpen(false);
      addForm.resetFields();
      
    } catch (error) {
      console.error('Błąd walidacji formularza:', error);
    }
  }

  const handleCopy = () => {
    if (!selectedMonth) return;
    dispatch(copyBillsFromPreviousMonth({ currentMonth: selectedMonth }));
  };

  return (
    <div>
      <h1>Stałe wydatki {selectedMonth ? `(${selectedMonth})` : 2025}</h1>
      <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
        <SearchForm onSearch={setSearchValue}/>
        <Button
          type='primary'
          onClick={()=>setIsAddModalOpen(true)}
          style={{height: 40}}
        >
          Dodaj
        </Button>
        <Tooltip placement='topLeft' title='Skopiuj dane z poprzedniego miesiąca' color='cyan'>
          <Button
            color="cyan" variant="solid"
            onClick={handleCopy}
            style={{ height: 40 }}
          >
            Skopiuj
          </Button>
        </Tooltip>
      </div>
      <Table columns={columns(handleEdit, handleDelete)} dataSource={filteredRecurringBill}  rowKey="id" />
      <EditableModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSave}
        form={form}
        title='Edytuj wydatek'
        fields={billsFields}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onSave={handleAddRecurringBills}
        form={addForm}
        title={'Dodaj stały wydatek'}
        fields={billsFields}
      />
    </div>
  )
}

export default RecurringBills;
