import './App.css'
import Coins from './Components/Coins'

function App() {

  return (
    <>
      <div>
        <h1 className='text-3xl font-bold'>Today's Cryptocurrency prices by market cap</h1>
        <Coins/>
      </div>
    </>
  )
}

export default App
