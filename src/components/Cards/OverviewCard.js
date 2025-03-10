import { Button, Card, Col, Typography } from 'antd';

const { Text } = Typography;

const getColorByValue = (value, type) => {
  const colorRules = {
    income: value > 5000 ? 'success' : value > 3000 ? 'warning' : 'danger',
    transactions: value < 2000 ? 'success' : value < 3000 ? 'warning' : 'danger',
    netWorth: value > 2000 ? 'success' : value > 0 ? 'warning' : 'danger',
  };

  return colorRules[type] || 'default';
};

const OverviewCard = ({ title, total, type, onNavigate }) => (
  <Col span={8} style={{marginBottom: 16}}>
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
