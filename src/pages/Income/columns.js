import React from 'react';
import { Button, Popconfirm } from 'antd';

export const columns = (handleEdit, handleDelete) => [
  {
    title: 'Data',
    dataIndex: 'date',
    key: 'date',
    width: '20%',
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
  {
    title: 'Źródło dochodu',
    dataIndex: 'source',
    key: 'source',
    sorter: (a, b) => a.source.localeCompare(b.source),
  },
  {
    title: 'Kwota',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => a.amount - b.amount,
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