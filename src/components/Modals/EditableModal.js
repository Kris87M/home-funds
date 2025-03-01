import React from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';

const EditableModal = ({ isOpen, onCancel, onSave, form, title, fields }) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      onOk={onSave}
      okText="Zapisz"
      cancelText="Anuluj"
    >
      <Form form={form} layout="vertical">
        {fields.map(({ name, label, type, rules }) => (
          <Form.Item key={name} name={name} label={label} rules={rules}>
            {type === 'date' ? (
              <DatePicker format="YYYY-MM-DD" placeholder="Wybierz datę" style={{ width: '100%' }} />
            ) : (
              <Input type={type || 'text'} />
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default EditableModal;
