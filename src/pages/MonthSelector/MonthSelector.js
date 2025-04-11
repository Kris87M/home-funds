import Card from 'antd/es/card/Card'
// import { useSelector } from 'react-redux'
import { Button, Col, Row } from 'antd';

const MonthSelector = () => {
  // const totalIncome = useSelector(state => state.income.items.reduce((sum, item) => sum + item.amount, 0));
  // const totalTransactions = useSelector(state => state.transactions.items.reduce((sum, item) => sum + item.amount, 0));
  // const totalRecurringBills = useSelector(state => state.recurringBills.items.reduce((sum, item) => sum + item.amount, 0))
  // const totalSpendings = totalTransactions + totalRecurringBills;

  const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']

  return (
    <div>
      <h1>Month Selector</h1>
      <Row gutter={16} >
        {months.map((month) => (
          <Col xs={24} sm={12} md={8} key={`pot-${month}`} style={{ marginBottom: 16 }}>
            <Card title={month.toUpperCase()} variant="borderless" style={{ width: 300 }} extra={<Button type="primary">Szczegóły</Button>}>
              {/* <p>Przychody: {totalIncome}</p>
              <p>Wydatki: {totalSpendings}</p> */}
      </Card>
            </Col>
          ))}
        </Row>




    </div>
  )
}

export default MonthSelector
