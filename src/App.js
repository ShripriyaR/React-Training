import { ToastContainer } from 'react-toastify';
import './App.css';
import TodosList from './Components/TodosList';

function App() {
  return (
    <div className="container mt-3">

      <TodosList/>
      <ToastContainer position="top-right" autoClose={3000}/>
    </div>
  );
}

export default App;
