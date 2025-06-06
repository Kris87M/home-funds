import { useState } from 'react'
import { addPots, deletePot, updatePot } from 'connector';
import { useDispatch, useSelector  } from 'react-redux'
import { Button, Card, Col, Form, Progress, Row, message, Popconfirm } from 'antd';
import { potsFields } from 'config/modalsFields';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { formatToTwoDecimalPlaces } from 'utils/formatToTwoDecimalPlacesUtils';
import styles from './Pots.module.scss'
import AddModal from 'components/Modals/AddModal';
import EditableModal from 'components/Modals/EditableModal';
import dayjs from 'dayjs';

const Pots = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const pots = useSelector((state) => state.pots.items)
  const error = useSelector((state) => state.pots.error)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  
  const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  const handleAddPot = async () => {
    try {
      const newPot = await addForm.validateFields();
      newPot.amount = Number(newPot.amount);
      newPot.date = newPot.date.format('YYYY-MM-DD');
      newPot.totalSaved = Number(newPot.totalSaved);
      dispatch(addPots(newPot));
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      console.error('Błąd walidacji formularza:', error);
    }
  }

  const updateTotalSaved = (id, delta) => {
    const pot = pots.find(pot => pot.id === id);
    if (!pot) return;

    const newTotal = pot.totalSaved + delta;

    if (newTotal < 0) {
      messageApi.open({type: 'warning', content: 'Zebrana kwota nie może być mniejsza od 0!'});
      return;
    }

    if (newTotal > pot.amount) {
      messageApi.open({type: 'success', content: 'Cel tej skarbonki został osiągnięty!'});
      return;
    }

    dispatch(updatePot({ ...pot, totalSaved: newTotal }));
  };

  const handleDelete = (id) => {
    dispatch(deletePot(id))
  }

  const handleEditPot = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
          ...record,
          date: dayjs(record.date),
        });
    setIsModalOpen(true);
  }

 const handleSave = async () => {
       try {
         const updatedRecord = await form.validateFields();
         updatedRecord.id = currentRecord.id;
         updatedRecord.amount = Number(updatedRecord.amount);
         updatedRecord.date = updatedRecord.date.format('YYYY-MM-DD');
         console.log(updatedRecord.date)
         updatedRecord.totalSaved = Number(updatedRecord.totalSaved);
         dispatch(updatePot(updatedRecord));
         setIsModalOpen(false);
         setCurrentRecord(null);
       } catch (error) {
         messageApi.open({
          type: 'error',
          content: `Błąd walidacji formularza: ${error.message}`,
          });
       }
     };
  
  return (
    <div>
      {contextHolder}
      <header className={styles.header}>
        <h1>Skarbonki</h1>
        <Button type='primary' onClick={() => setIsAddModalOpen(true)}><PlusOutlined />Nowa skarbonka</Button>
      </header>
        <Row gutter={16} >
          {pots.map((pot) => (
            <Col xs={24} sm={12} md={8} key={`pot-${pot.id}`} style={{ marginBottom: 16 }}>
              <Card
                title={<div style={{ whiteSpace: 'normal' }}>{pot.name}</div>}
                extra={<p>Zebrano: {(pot.totalSaved).toFixed(2)} / {pot.amount} PLN</p>}
                actions={[
                  <Button type='primary' icon={<PlusOutlined />} onClick={() => updateTotalSaved(pot.id, 100)} />,
                  <Button type='primary' danger icon={<MinusOutlined onClick={() => updateTotalSaved(pot.id, -100)}/>} />,
                  <Button type='primary' onClick={() => handleEditPot(pot)}>Edytuj</Button>,
                  <Button type='primary' danger>
                    <Popconfirm
                      title="Czy na pewno chcesz usunąć ten rekord?"
                      onConfirm={() => handleDelete(pot.id)}
                      okText="Tak"
                      cancelText="Nie"
                    >
                      Usuń
                    </Popconfirm>
                  </Button>
                ]}>
                <Progress
                  percent={pot.amount ? ((pot.totalSaved / pot.amount) * 100).toFixed() : 0}
                  strokeColor={twoColors}
                />
              </Card>
            </Col>
          ))}
        </Row>
      <EditableModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSave}
        form={form}
        title='Edytuj wydatek'
        fields={potsFields}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onSave={handleAddPot}
        form={addForm}
        title="Dodaj nowy skarbonkę"
        fields={potsFields}
      />
    </div>
  )
}

export default Pots
