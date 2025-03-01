import React from 'react';
import { Button } from 'antd';

export const columns = (handleEdit) => [
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
    render: (_, record) => (
      <Button 
        type="primary" 
        onClick={() => handleEdit(record)} 
      >
        Edytuj
      </Button>
    ),
  },
];
