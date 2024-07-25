import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Modal from './Modal'
import Result from './Result'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modal" element={<Modal/>} />
        <Route path="/result" element={<Result/>} />
      </Routes>

    </BrowserRouter>
  )
}
