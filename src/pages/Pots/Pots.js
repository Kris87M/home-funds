import React, { useEffect } from 'react'
import { getPots } from 'connector';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Progress, Row } from 'antd';
import styles from './Pots.module.scss'
import { PlusOutlined } from '@ant-design/icons';

const Pots = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.pots.status);
  const pots = useSelector((state) => state.pots.items)
 
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPots());
    }
  }, [status, dispatch]);

  const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  return (
    <div className>
      <header className={styles.header}>
        <h1>Skarbonki</h1>
        <Button type='primary'><PlusOutlined />Nowa skarbonka</Button>
      </header>
      <ul>
        {pots.map((pot) => (
          <Row gutter={16}>
            <Col span={8}>
              <Card
                key={pot.id}
                title={pot.name}
                extra={<p>Kwota do zebrania:  {pot.amount} PLN</p>}
                actions={[<Button type='primary'>Dodaj</Button>, <Button type='primary' danger>Usuń</Button>]}>
                <Progress percent={(pot.totalSaved / pot.amount) * 100} strokeColor={twoColors}/>
              </Card>
            </Col>
          </Row>
          ))}
      </ul>
    </div>
  )
}

export default Pots
