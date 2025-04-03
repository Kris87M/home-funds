import { getPots } from 'connector';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Pots = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.pots.status);
  const pots = useSelector((state) => state.pots.items)
 
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPots());
    }
  }, [status, dispatch]);


  return (
    <div>
      <h1>Skarbonki</h1>
      <ul>
          {pots.map((pot) => (
            <li key={pot.id}>{pot.id} - {pot.name} - {pot.amount} - {pot.totalSaved}</li>
          ))}
      </ul>
    </div>
  )
}

export default Pots
