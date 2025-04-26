import { actionsColumn } from 'columns/actionsColumns';

export const columns = (handleEdit, handleDelete) => [
  {
    title: 'Data',
    dataIndex: 'date',
    key: 'date',
    width: "20%",
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
  {
    title: 'Opis',
    dataIndex: 'description',
    key: 'description',
    sorter: (a, b) => a.description.localeCompare(b.description),
  },
  {
    title: 'Kwota',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Kategoria',
    dataIndex: 'category',
    render: (categories) => categories ? categories.join(', ') : '',
    key: 'category',
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  actionsColumn(handleEdit, handleDelete),
];