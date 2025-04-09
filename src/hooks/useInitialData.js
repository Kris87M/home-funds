import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIncome, getTransactions, getPots, getRecurringBills } from 'connector';

export const useInitialData = () => {
  const dispatch = useDispatch();

  const incomeStatus = useSelector(state => state.income.status);
  const billsStatus = useSelector(state => state.recurringBills.status);
  const transactionsStatus = useSelector(state => state.transactions.status);
  const potsStatus = useSelector(state => state.pots.status);

  useEffect(() => {
    const actions = [
      { status: incomeStatus, fetch: getIncome },
      { status: billsStatus, fetch: getRecurringBills },
      { status: transactionsStatus, fetch: getTransactions },
      { status: potsStatus, fetch: getPots },
    ];

    actions.forEach(({ status, fetch }) => {
      if (status === 'idle') {
        dispatch(fetch());
      }
    });
  }, [dispatch, incomeStatus, billsStatus, transactionsStatus, potsStatus]);

  const isLoading = useMemo(() => {
    return (
      incomeStatus === 'loading' ||
      billsStatus === 'loading' ||
      transactionsStatus === 'loading' ||
      potsStatus === 'loading'
    );
  }, [incomeStatus, billsStatus, transactionsStatus, potsStatus]);

  return { isLoading };
};
