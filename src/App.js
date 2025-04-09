import { BrowserRouter } from 'react-router-dom';
import { useInitialData } from 'hooks/useInitialData';
import Layout from 'layout/Layout/Layout';
import Spinner from 'components/Spinner/Spinner';

const App = () => {
  const { isLoading } = useInitialData();

  return (
    <BrowserRouter>
      {isLoading ? <Spinner /> : <Layout />}
    </BrowserRouter>
  )
}

export default App;
