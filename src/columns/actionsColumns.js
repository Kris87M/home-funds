import { Button, Popconfirm } from 'antd';

export const actionsColumn = (handleEdit, handleDelete) => ({
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
});