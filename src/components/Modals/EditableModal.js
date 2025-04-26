import React from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';

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
        {fields.map(({ name, label, type, rules, options = [], placeholder }) => (
          <Form.Item key={name} name={name} label={label} rules={rules}>
            {type === 'date' ? (
              <DatePicker format="YYYY-MM-DD" placeholder="Wybierz datę" style={{ width: '100%' }} />
            ) : type === 'select' ? (
              <Select
                mode="tags"
                tokenSeparators={[',']}
                showSearch
                placeholder={placeholder || 'Wybierz lub wpisz kategorię'}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {options.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
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
