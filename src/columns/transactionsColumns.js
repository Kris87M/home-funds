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
    key: 'category',
    render: (category) => [].concat(category).join(', '),
    sorter: (a, b) => {
      const aCategory = [].concat(a.category).join(', ');
      const bCategory = [].concat(b.category).join(', ');
      return aCategory.localeCompare(bCategory);
    },
  },
  actionsColumn(handleEdit, handleDelete),
];