import Card from 'antd/es/card/Card'
import { useSelector } from 'react-redux'
import { Button, Col, Row, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedMonth } from 'store/slices/monthSlice';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const MonthSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const incomeItems = useSelector(state => state.income.items);
  const transactionsItems = useSelector(state => state.transactions.items);
  const recurringBillsItems = useSelector(state => state.recurringBills.items);
  
  const year = 2025;
  const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']

  const getMonthString = (index) => {
    const year = 2025;
    return `${year}-${String(index + 1).padStart(2, '0')}`;
  };

  const getMonthlySummary = (monthString) => {
    const income = incomeItems
      .filter(item => item.date.startsWith(monthString))
      .reduce((sum, item) => sum + item.amount, 0);

    const transactions = transactionsItems
      .filter(item => item.date.startsWith(monthString))
      .reduce((sum, item) => sum + item.amount, 0);

    const bills = recurringBillsItems
      .filter(item => item.dueDate?.startsWith(monthString))
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      income,
      spending: transactions + bills,
    };
  };

  const handleMonthSelect = (index) => {
    const monthString = `${year}-${String(index + 1).padStart(2, '0')}`;
    dispatch(setSelectedMonth(monthString));
    navigate('/overview')
};

  return (
    <div>
      <header className="header" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginRight: 16 }}>
        <h1>Kalendarz {year}</h1>
        <Tooltip title="Wybierz miesiąc lub przejdź bezpośrednio do zakładek po lewej żeby zobaczyć podsumowanie roczne" placement='right'>
          <ExclamationCircleOutlined style={{ fontSize: '24px'}}/>
        </Tooltip>
      </header>
     
      <Row gutter={16} >
        {months.map((month, index) => {
          const monthString = getMonthString(index);
          const { income, spending } = getMonthlySummary(monthString);

          return (
            <Col xs={24} sm={12} md={8} key={`pot-${month}`} style={{ marginBottom: 16 }}>
              <Card
                title={month.toUpperCase()}
                variant="borderless"
                style={{ width: 300 }}
                extra={<Button type="primary" onClick={() => handleMonthSelect(index)}>Szczegóły</Button>}
              >
                {income > 0 ? (
                  <p>Przychody: {income} PLN</p>
                ) : (
                  <p style={{ color: 'gray' }}>
                    <ExclamationCircleOutlined /> Brak przychodów
                  </p>
                )}
                {spending > 0 ? (
                  <p>Wydatki: {spending} PLN</p>
                ) : (
                  <p style={{ color: 'gray' }}>
                    <ExclamationCircleOutlined /> Brak wydatków
                  </p>
                )}
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default MonthSelector
