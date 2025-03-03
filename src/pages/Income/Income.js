import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIncome, postIncome } from 'connector';
import { Table, Button, Modal } from 'antd';
import { columns } from './columns';
import IncomeForm from 'components/IncomeForm/IncomeForm';

const Income = () => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income.items);
  const status = useSelector((state) => state.income.status);
  const error = useSelector((state) => state.income.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIncome());
    }
  }, [status, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (values) => {
    dispatch(postIncome(values));
    setIsModalOpen(false); // Zamknięcie modala po wysłaniu formularza
  };

  const showModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  if (status === 'loading') {
    return <p>Ładowanie...</p>;
  }

  if (status === 'failed') {
    return <p>Błąd: {error}</p>;
  }

  return (
    <div>
      <h1>Przychody</h1>
      <Table dataSource={income} columns={columns} />
      <Button type="primary" onClick={showModal}>Dodaj nowy przychód</Button>
      <Modal
        title="Formularz dodania nowego przychodu"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <IncomeForm onSubmit={handleSubmit}/>
      </Modal>
    </div>
  );
};

export default Income;
