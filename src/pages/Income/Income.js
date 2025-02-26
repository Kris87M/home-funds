import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncome, updateIncome } from 'connector';
import { Table, notification, Modal, Form, Input, DatePicker } from 'antd';
import { columns } from './columns';
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

  const handleSave = async () => {
    try {
      const updatedRecord = await form.validateFields();
      updatedRecord.id = currentRecord.id;
      updatedRecord.date = updatedRecord.date.format('YYYY-MM-DD');
      dispatch(updateIncome(updatedRecord));
      setIsModalOpen(false);
      setCurrentRecord(null);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const handleOk = () => {
    handleSave();
  };

  if (status === 'loading') {
    return <p>Ładowanie...</p>;
  }

  if (status === 'failed') {
    return <p>Błąd: {error}</p>;
  }

  return (
    <div>
      <h1>Przychody</h1>
      <Table dataSource={income} columns={columns(handleEdit)} rowKey="id" />
      <Modal
        title="Edytuj dane"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Zapisz"
        cancelText="Anuluj"
      >
        <Form form={form} layout="vertical" initialValues={currentRecord}>
          <Form.Item
            name="date"
            label="Data"
            rules={[{ required: true, message: 'Proszę wprowadzić datę!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Wybierz datę"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="source"
            label="Źródło dochodu"
            rules={[{ required: true, message: 'Proszę wprowadzić źródło dochodu!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Kwota"
            rules={[{ required: true, message: 'Proszę wprowadzić kwotę!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Income;
