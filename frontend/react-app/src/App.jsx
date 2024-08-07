import './App.css'
import Coins from './Components/Coins'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <div>
        <ToastContainer/>
        <h1 className='text-3xl font-bold'>Today's Cryptocurrency prices by market cap</h1>
        <Coins/>
      </div>
    </>
  )
}

export default App
