import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Row } from 'antd'
import { useFilteredData } from 'hooks/useFiltredData';
import { formatToTwoDecimalPlaces } from 'utils/formatToTwoDecimalPlacesUtils';
import OverviewCard from 'components/Cards/OverviewCard';

const calculateTotal = (items = []) => items.reduce((sum, item) => sum + item.amount, 0);

const Overview = () => {
  const navigate = useNavigate();
  
  const { transactions, income, recurringBills } = useFilteredData();
  const pots = useSelector(state => state.pots.items)
  const totalIncome = calculateTotal(income);
  const totalRecurringBills = calculateTotal(recurringBills);
  const totalTransactions = calculateTotal(transactions);
  const netWorth = totalIncome - (totalRecurringBills + totalTransactions);

  const totalSavedInPots = pots.reduce((sum, pot) => sum + pot.totalSaved, 0);

  return (
    <div>
      <h1>Przegląd</h1>
      <Row gutter={16}>
        <OverviewCard title='Przychody' total={formatToTwoDecimalPlaces(totalIncome)} type='income' onNavigate={() => navigate('/income')}/>
        <OverviewCard title='Stałe wydatki' total={formatToTwoDecimalPlaces(totalRecurringBills)} type='recurringBills' onNavigate={() => navigate('/recurring-bills')}/>
        <OverviewCard title='Bieżące wydatki' total={formatToTwoDecimalPlaces(totalTransactions)} type='transactions' onNavigate={() => navigate('/transactions')}/>
        <OverviewCard title='Bilans' total={formatToTwoDecimalPlaces(netWorth)} type='netWorth' onNavigate={() => navigate('/balance-sheet')} />
        <OverviewCard title='Skarbonki' total={formatToTwoDecimalPlaces(totalSavedInPots)} type='pots' onNavigate={() => navigate('/pots')} />
      </Row> 
    </div>
  )
}

export default Overview
