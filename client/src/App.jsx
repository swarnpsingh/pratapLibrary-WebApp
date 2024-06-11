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

function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/info' element={<General />}/>
            <Route path='/credentials/:id' element={<Credentials />}/>
            <Route path='/seat-sellection/:id' element={<SeatSellection />}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
