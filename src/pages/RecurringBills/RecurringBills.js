import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecurringBills } from 'connector';
import shortid from 'shortid';

const RecurringBills = () => {
  const dispatch = useDispatch();
  const {items, status, error} = useSelector((state) => state.recurringBills);

  useEffect(() => {
    dispatch(fetchRecurringBills());
  }, [dispatch]);

  if(status === 'loading') return <p>Ładowanie...</p>;
  if(status === 'failed') return <p>Błąd: {error}</p>;

  return (
    <div>
      <h1>Stałe wydatki</h1>
      <ul>
        {items.map(item => (
          <li key={shortid}>{item.id} {item.name} {item.amount} {item.dueDate} {item.category}</li>
        ))}
      </ul>
     
    </div>
  )
}

export default RecurringBills
