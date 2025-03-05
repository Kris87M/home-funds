import React from 'react';
import { Button, Popconfirm } from 'antd';

export const columns = (handleEdit, handleDelete) => [
    {
      title: 'Nazwa',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Kwota',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Termin płatności',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    },
    {
      title: 'Kategoria',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Akcje',
      key: 'actions',
      width: '20%',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edytuj
          </Button>
          <Popconfirm
            title="Czy na pewno chcesz usunąć ten rekord?"
            onConfirm={() => handleDelete(record.id)}
            okText="Tak"
            cancelText="Nie"
          >
            <Button type="primary" danger style={{ marginLeft: 8 }}>
              Usuń
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
