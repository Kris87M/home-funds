import { Button, Card, Col, Typography } from 'antd';

const { Text } = Typography;

const getColorByValue = (value, type) => {
  if (type === 'income') return value > 2000 ? 'success' : value < 2000 ? 'warning' : 'danger';
  if (type === 'transactions') return value < 2000 ? 'success' : value > 4000 ? 'danger' : 'warning';
  return 'default';
};

const OverviewCard = ({ title, total, type, onNavigate }) => (
  <Col span={8}>
    <Card
      title={title}
      variant="borderless"
      extra={<Button onClick={onNavigate} type="primary">Szczegóły</Button>}
    >
      <Text style={{ fontSize: '24px', fontWeight: 'bold' }} type={getColorByValue(total, type)}>
        {total}
      </Text>
    </Card>
  </Col>
);

export default OverviewCard;
