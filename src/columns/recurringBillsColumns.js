import { actionsColumn } from 'columns/actionsColumns';

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
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  actionsColumn(handleEdit, handleDelete),
];
