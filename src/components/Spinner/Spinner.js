import { Spin } from 'antd';
import styles from './Spinner.module.scss'

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <Spin size="large" tip="Ładowanie danych..." fullscreen />
    </div>
  );
};

export default Spinner;
