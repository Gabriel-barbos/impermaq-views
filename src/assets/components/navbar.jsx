
import '../styles/navbar.css'
import  { useState } from 'react';
import { AlignJustify } from 'lucide-react';
import logo from '../../assets/img/logo.jpg'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
      <AlignJustify className="menu-icon" onClick={toggleMenu}  />

        <img src= {logo} alt="Logo" className="logo" />
      </div>
    </nav>
  );
};

export default Navbar;
