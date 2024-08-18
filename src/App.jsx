

import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Home from './pages/Home/Home'
import AdminLogin from "./pages/Login/Login"
import Admin from "./pages/Admin/Admin"
import ProductPage from "./pages/Product/Product"
function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/product/:id" element={<ProductPage />} />

      </Routes>
    </Router>
  )
}

export default App
