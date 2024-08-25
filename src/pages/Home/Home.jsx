import './home.css'
import Navbar from '../../assets/components/navbar';

import main from '../../assets/img/main.png'

// icons
import img1 from '../../assets/img/img1.png'
import img2 from '../../assets/img/img2.png'
import img3 from '../../assets/img/img3.png'

import book_icon from '../../assets/img/icons/book.svg'
import check_icon from '../../assets/img/icons/checklist.svg'
import key_icon from  '../../assets/img/icons/tool.svg'
import money_icon from  '../../assets/img/icons/coin.svg'
import phone_icon from '../../assets/img/icons/phone.svg'
import card_icon from '../../assets/img/icons/card.svg'
import checkitem_icon from '../../assets/img/icons/check.svg'
import mail from '../../assets/img/icons/mail.svg'
import wpp from '../../assets/img/icons/wpp.svg'
import logo from '../../assets/img/logo.jpg'
//components
import { ArrowUpRight } from 'lucide-react';

import { fetchAdminData } from '../../api';
import { fetchProducts } from '../../api';
import  { useEffect, useState } from 'react';
import ProductCard from '../../assets/components/product-card';
import { useNavigate } from 'react-router-dom'; 
import {  Modal, Result, Carousel} from 'antd';


function Home(){

  const [products, setProducts] = useState([]); //buscar produtos
  const [loading, setLoading] = useState(true); //estado de busca
  const [error, setError] = useState(null); //estado de erro de busca
  const [adminData, setAdminData] = useState({}); //buscar dados do admin
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [clickCount, setClickCount] = useState(0);

//Alert MOdal
const info = () => {
  Modal.info({
    title: 'Serviço indisponivel',
    content: (
      
       <Result
          status="warning"
          title="Esse serviço esta temporariamente indisponivel"
      />
      
    ),
    onOk() {},
  });
};


  const navigate = useNavigate(); 

    useEffect(() => {
      const getData = async () => {
        try {
          const [products, adminData] = await Promise.all([
            fetchProducts(),
            fetchAdminData()
          ]);
          setProducts(products);
          setAdminData(adminData);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      getData();
    }, []);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
 

    //funções do js para dinamica do site
  
    //WPP Button
    const redirectToWhatsApp = () => {
      if (adminData.telefone) {
        const formattedPhone = adminData.telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
        const url = `https://wa.me/${formattedPhone}`;
        window.open(url, '_blank');
      } else {
        alert('Número de telefone do administrador não disponível.');
      }
    };

    //Email button
    const redirectToEmail = () => {
        if (adminData.email) {
          const url = `mailto:${adminData.email}`;
          window.open(url, '_blank');
        } else {
          alert('Endereço de e-mail do administrador não disponível.');
        }
      };

//see all products function
      const toggleShowAllProducts = () => {
        setShowAllProducts(!showAllProducts);
      };
    
      //image login page
      const handleImageClick = () => {
        setClickCount(clickCount + 1);
        if (clickCount + 1 >= 7) {
          navigate('/login'); // Redireciona para outra página

        }
      };

      const contentStyle = {
        height: '260px',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };

    

      const images = [img2,img3,img1];


  return (
    <>
      <Navbar />
      {/* Home */}
      <div className="home-container">
      <div className="main-menu">
        <div className="main-menu__content">
          <img src={main} className="main-image" />
          <h1 id="main-menu" className="menu-title">
            Seu Parceiro em Máquinas Industriais de Confiança
          </h1>
        </div>
      </div>

      {/* subheader */}

<div className='subheader'>
    <h2>Compra e venda de máquinas e equipamentos novos e usados </h2>

      
    <div className='header-carousel'>
  <Carousel autoplay>
    {images.map((image, index) => (
      <div key={index} style={contentStyle}>
        <img
          src={image}
          alt={`slide-${index}`}
        className='carousel-image'/>
      </div>
    ))}
  </Carousel>
  </div>
      

  </div>
      {/* Maquinas */}

      <section className="machines-container">
        <h1 id='produtoo'>Máquinas</h1>
        
          {products.slice(0, showAllProducts ? products.length : 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        <button className="see-all-btn" onClick={toggleShowAllProducts}>
          <span className="button-text">{showAllProducts ? 'VER MENOS' : 'VER MAIS'}</span>
          <ArrowUpRight className="icon" />
        </button>
      </section>


      <section className="services">
        <h1 id='services'>Serviços</h1>
        <div className="services-list">
          <div className="service-card">
            <div className="service-container">
              <div className="icon-container">
                <img src={check_icon} className="service-image" />
              </div>
              <h3 className="service-title">Manutenção Preventiva</h3>
              <button onClick={info}>Entre em contato</button>
            
            </div>
          </div>

          <div className="service-card">
            <div className="service-container">
              <div className="icon-container">
                <img src={key_icon} className="service-image" />
              </div>
              <h3 className="service-title">Manutenção Corretiva</h3>
              <button onClick={info} >Entre em contato</button>
            </div>
          </div>

          <div className="service-card">
            <div className="service-container">
              <div className="icon-container">
                <img src={book_icon} className="service-image" />
              </div>
              <h3 className="service-title">Consultoria</h3>
              <button onClick={info}>Entre em contato</button>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className='about'>
        <h1 id='about'>Sobre nós</h1>
        <div className='about-container'>
          <div className='about-text'>
            <p>
              {adminData.sobre}
            </p>
          </div>
            <img src= {logo} alt="Logo" className="logo" />
        </div>
        
        
        <div className='skills-container'>

         <div className='skill-card'>
          <img src={money_icon} />
          <h3>Preço justo</h3>
         </div>
          
         <div className='skill-card'>
          <img src={card_icon} />
          <h3>Melhores Condições</h3>
         </div>

         <div className='skill-card'>
          <img src={checkitem_icon} />
          <h3>Garantia Estendida</h3>
         </div>

         <div className='skill-card'>
          <img src={phone_icon} />
          <h3>Suporte Rápido</h3>
         </div>

            </div>
      </section>

{/* CONTATO */}
<section className='contact'>

<h1 id='contact'>Contato</h1>

<div className='contact-container'>

<div className='contact-card'>
  <h2>Fale com nosso time via E-mail</h2>
  <img src={mail} />
  <div className='button-email'>
  <button onClick={redirectToEmail}>{adminData.email}</button>
  </div></div>

<div className='contact-container'>
<div className='contact-card'>
  <h2>Fale com nosso time WhatsApp</h2>
  <img src={wpp} />
  
  <div className='button-wpp'>
  <button onClick={redirectToWhatsApp}>Clique Aqui</button>
  </div>
</div>
</div>
</div>
</section>

<footer>
  <div className='footer-container'>
    <div className='footer-left'>
   <p> 
  Contatos <br/>
  cel. {adminData.telefone}<br/>

Email <br/>
{adminData.email}
</p>
    </div>
    <div className='footer-middle'>
        <img src={logo} onClick={handleImageClick}></img>
        <h4>© 2024. Site desenvolvido por Gabriel Barbosa Da Silva</h4>
        </div>
    <div className='footer-right'>
      <p>
        Rua Dom Manuel O Venturos, 40 <br>
        </br>CEP 03806-100 São Paulo-SP
      </p>
 <p> 
  Hórario de funcionamento<br/>
  Seg - Sex / 9:00 - 18:00 Hs.
    </p>
    </div>
  </div>
</footer>
</div>

    </>
  );
}
export default Home;