import Table from './components/table/table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Table/>
      <ToastContainer position='bottom-left' autoClose={3000} />
    </div>
  );
}

export default App;
