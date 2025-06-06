import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { useFilteredData } from 'hooks/useFiltredData';
import { generateColors } from 'utils/generateColorsUtils';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, ChartDataLabels, Tooltip, Legend);

const BalanceSheet = () => {
  const { transactions, income, recurringBills } = useFilteredData();
  const selectedMonth = useSelector(state => state.month.selectedMonth)

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalTransactions = transactions.reduce((sum, item) => sum + item.amount, 0);
  const totalRecurringBills = recurringBills.reduce((sum, item) => sum + item.amount, 0);

  const totalSpendings = totalTransactions + totalRecurringBills;
  const totalSavings = totalIncome - totalSpendings;

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
        labels: income.map(income => income.source),
        datasets: [{
          data: income.map(income => income.amount),
          backgroundColor: generateColors(income.length),
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
      labels: {
        usePointStyle: true,
        align: 'start',
        font: {
          size: 8,
          weight: 'bold',
        }
      }
    },
    datalabels: {
      align: 'end',
      anchor: 'center',
      // font: {
        // size: 14,
        // weight: 'bold',
      // },
    },
  },
  maintainAspectRatio: false,
};

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Bilans {selectedMonth ? `(${selectedMonth})` : 2025}</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        {charts.map((chart, index) => {
          const hasData = chart.data.datasets[0].data.some(value => value > 0);
          return (
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
              {hasData ? (<Pie data={chart.data} options={options} />) : (<p style={{ marginTop: '6rem', color: 'gray' }}>Brak danych do wyświetlenia</p>)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BalanceSheet;