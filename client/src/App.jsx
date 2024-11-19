import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Home from "./components/Home"
import General from "./components/General"
import Credentials from "./components/Credentials"
import SeatSellection from "./components/SeatSellection"
import Admin from './components/Admin';
import Confirmation from './components/Confirmation';

function App() {
  // /seat-selection/${uniqueId}
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/info' element={<General />}/>
            <Route path='/credentials/:id' element={<Credentials />}/>
            <Route path='/seats/:id' element={<SeatSellection />}/>
            <Route path='/confirmation/:id' element={<Confirmation />}/>
            <Route path='/admin' element={<Admin />}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
