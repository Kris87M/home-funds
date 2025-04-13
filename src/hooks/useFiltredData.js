import { useSelector } from 'react-redux';

export const useFilteredData = () => {
  const selectedMonth = useSelector((state) => state.month.selectedMonth);
  const transactions = useSelector((state) => state.transactions.items);
  const income = useSelector((state) => state.income.items);
  const recurringBills = useSelector((state) => state.recurringBills.items);

  if (!selectedMonth) return { transactions, income, recurringBills };

  return {
    transactions: transactions.filter((item) => item.date.startsWith(selectedMonth)),
    income: income.filter((item) => item.date.startsWith(selectedMonth)),
    recurringBills: recurringBills.filter((item) => item.dueDate?.startsWith(selectedMonth)),
  };
};
