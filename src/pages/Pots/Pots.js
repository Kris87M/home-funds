import React, { useEffect, useState } from 'react'
import { addPots, getPots } from 'connector';
import { useDispatch, useSelector  } from 'react-redux'
import { Button, Card, Col, Form, Progress, Row } from 'antd';
import styles from './Pots.module.scss'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import AddModal from 'components/Modals/AddModal';

const Pots = () => {
  const dispatch = useDispatch();
  const pots = useSelector((state) => state.pots.items)
  const status = useSelector((state) => state.pots.status);
  const error = useSelector((state) => state.pots.error)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
 
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPots());
    }
  }, [status, dispatch]);

  const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  const handleAddPot = async () => {
    try {
          const newPot = await addForm.validateFields();
          newPot.amount = Number(newPot.amount);
          newPot.totalSaved = Number(newPot.totalSaved);
          dispatch(addPots(newPot));
          setIsAddModalOpen(false);
          addForm.resetFields();
        } catch (error) {
          console.error('Błąd walidacji formularza:', error);
        }
  }

  return (
    <div>
      <header className={styles.header}>
        <h1>Skarbonki</h1>
        <Button type='primary' onClick={() => setIsAddModalOpen(true)}><PlusOutlined />Nowa skarbonka</Button>
      </header>
        <Row gutter={16} >
          {pots.map((pot) => (
            <Col key={pot.id} span={8} style={{marginBottom: 16}}>
              <Card
                title={<div style={{ whiteSpace: 'normal' }}>{pot.name}</div>}
                extra={<p>Zebrano: {pot.totalSaved} / {pot.amount} PLN</p>}
                actions={[<Button type='primary' icon={<PlusOutlined />} />, <Button type='primary' danger icon={<MinusOutlined />} />, <Button type='primary'>Edytuj</Button>]}>
                <Progress percent={((pot.totalSaved / pot.amount) * 100).toFixed()} strokeColor={twoColors}/>
              </Card>
            </Col>
          ))}
        </Row>
      <AddModal
        isOpen={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onSave={handleAddPot}
        form={addForm}
        title="Dodaj nowy skarbonkę"
        fields={[
          { name: 'name', label: 'Nazwa skarbonki', type: 'text', rules: [{ required: true, message: 'Wprowadź nazwę!' }] },
          { name: 'amount', label: 'Kwota do zebrania:', type: 'number', rules: [{ required: true, message: 'Wprowadź kwotę!' }] },
          { name: 'totalSaved', label: 'Kwota początkowa', type: 'number', rules: [{ required: true, message: 'Wprowadź kwotę początkową!' }] },
        ]}
      />
    </div>
  )
}

export default Pots
