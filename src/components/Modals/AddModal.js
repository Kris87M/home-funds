import React from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';

const AddModal = ({ 
  isOpen, 
  onCancel, 
  onSave, 
  form, 
  title, 
  fields = [] 
}) => {
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
        {fields.map((field) => (
          <Form.Item 
            key={field.name} 
            name={field.name} 
            label={field.label} 
            rules={field.rules || []}
          >
            {field.type === 'date' ? (
              <DatePicker style={{ width: '100%' }} />
            ) : field.type === 'select' ? (
              <Select>
                {field.options.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Input type={field.type || 'text'} />
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default AddModal;
