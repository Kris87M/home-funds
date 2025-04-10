import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const BalanceSheet = () => {
  const incomes = useSelector(state => state.income.items);
  const transactions = useSelector(state => state.transactions.items);
  const recurringBills = useSelector(state => state.recurringBills.items);

  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalTransactions = transactions.reduce((sum, item) => sum + item.amount, 0);
  const totalRecurringBills = recurringBills.reduce((sum, item) => sum + item.amount, 0);

  const totalSpendings = totalTransactions + totalRecurringBills;
  const totalSavings = totalIncome - totalSpendings;

  const generateColors = (count) => {
    const colors = [];

    for (let i = 0; i < count; i++) {
      const hue = Math.floor((360 / count) * i);
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
  };

  const getSummaryByCategory = (data) => {
    return data.reduce((acc, data) => {
      if (!acc[data.category]) {
        acc[data.category] = 0;
      }
      acc[data.category] += data.amount;
      return acc;
    }, {});
  };

  const billsSummary = getSummaryByCategory(recurringBills);
  const billsLabels = Object.keys(billsSummary);
  const billsValues = Object.values(billsSummary);
  const billsColors = generateColors(billsLabels.length);

  const transactionsSummary = getSummaryByCategory(transactions);
  const transactionsLabels = Object.keys(transactionsSummary);
  const transactionsValues = Object.values(transactionsSummary);
  const transactionsColors = generateColors(transactionsLabels.length);

  const charts = [
    {
      title: 'Podsumowanie',
      data: {
        labels: ['Stałe wydatki', 'Bieżące wydatki', 'Oszczędności'],
        datasets: [{
          data: [totalRecurringBills, totalTransactions, totalSavings],
          backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
        }]
      }
    },
    {
      title: 'Przychody',
      data: {
        labels: incomes.map(income => income.source),
        datasets: [{
          data: incomes.map(income => income.amount),
          backgroundColor: generateColors(incomes.length),
        }]
      }
    },
    {
      title: 'Stałe wydatki',
      data: {
        labels: billsLabels,
        datasets: [{
          data: billsValues,
          backgroundColor: billsColors,
        }],
      }
    },
    {
      title: 'Bieżące wydatki',
      data: {
        labels: transactionsLabels,
        datasets: [{
          data: transactionsValues,
          backgroundColor: transactionsColors,
        }],
      }
    },
  ]

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Bilans</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        {charts.map((chart, index) => (
          <div
            key={index}
            style={{
              flex: '0 1 calc(50% - 2rem)',
              minWidth: 300,
              height: 320,
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            <h3 style={{ marginBottom: '1rem' }}>{chart.title}</h3>
            <Pie data={chart.data} options={options} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BalanceSheet;