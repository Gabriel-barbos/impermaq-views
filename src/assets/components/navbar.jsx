import '../styles/navbar.css'
import { useState, useEffect } from 'react';
import { AlignJustify } from 'lucide-react';
import logo from '../../assets/img/logo.jpg'
import { fetchAdminData } from '../../api'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAdminData();
        setAdminData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dependência vazia para chamar apenas na montagem do componente

  return (
    <nav className="navbar">
      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><a href="#main-menu">Home</a></li>
        <li><a href="#produtoo">Produtos</a></li>
        <li><a href="#services">Serviços</a></li>
        <li><a href="#about">Sobre Nós</a></li>
        <li><a href="#contact">Contato</a></li>
      </ul>
      <div className="navbar-logo">
        <AlignJustify className="menu-icon" onClick={toggleMenu} />
        <img src={logo} alt="Logo" className="logo" />
        <span className="navbar-title">IMPERMAQ</span>
        <div className='visit-card'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <p>
              Rua Dom Manuel O Venturos, 40 <br />
              {adminData.telefone}
              <br />
            </p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
