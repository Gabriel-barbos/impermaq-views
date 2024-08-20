import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from "../../assets/components/Backbutton";
import './product.css';
import placeholder from '../../assets/img/placeholder1.png';
import logo_placeholder from '../../assets/img/logo_placeholder.jpeg';
import { fetchAdminData } from '../../api';
import { Carousel, Spin } from 'antd';
import Navbar from '../../assets/components/navbar';
function ProductPage() {
  
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminData, setAdminData] = useState({}); //buscar dados do admin

  const contentStyle1 = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };
  const content = <div style={contentStyle1} />;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, adminData] = await Promise.all([
          fetch(`https://backend-api-gold-mu.vercel.app/api/products/${id}`),
          fetchAdminData()
        ]);
  
        if (!productResponse.ok) {
          throw new Error('Produto não encontrado');
        }
  
        const productData = await productResponse.json();
  
        setProduct(productData);
        setAdminData(adminData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  
  if (loading) {
    return <div><Spin tip="Loading" size="large">
      {content}
    </Spin>;</div>;
  }
  
  if (error) {
    return <div>Erro: {error}</div>;
  }

  const redirectToWhatsApp = () => {
    if (adminData.telefone) {
      const formattedPhone = adminData.telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
      const message = `Olá, gostaria de obter o orçamento do ${encodeURIComponent(product.name)}.`; // Mensagem pré-pronta
      const url = `https://wa.me/${formattedPhone}?text=${message}`;
      window.open(url, '_blank');
    } else {
      alert('Número de telefone do administrador não disponível.');
    }
  };

  const handleImageError = (e) => {
    e.target.src = placeholder; // Substitui a imagem com o placeholder
  };
  
  // Use URLs do Cloudinary
  const images = product.images && product.images.length > 0 ? product.images : [placeholder, placeholder, placeholder, placeholder, placeholder];

  return (
    <>
    <Navbar/>
    <BackButton  />
      
      <div className="product-top">
      <div className="img-container">
      <Carousel 
      arrows 
      infinite={true}
      dots={true} // Ativa os pontos de navegação
      autoplay={true} // Reproduz automaticamente
      >
         {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Produto ${index + 1}`}
                  className="carousel-img"
                  onError={handleImageError}
            />
          </div>
        ))}
      </Carousel>
    
    </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <span className={`badge ${product.condition === 'Novo' ? 'badge-novo' : 'badge-usado'}`}>
            {product.condition === 'Novo' ? 'NOVO' : 'USADO'}
          </span>
          <button className="buy-now" onClick={redirectToWhatsApp}>Solicitar Orçamento</button>
          
          <h3>Descrição</h3>
          <p>{product.description}</p>
          
          <div className="product-bottom-right">
            <h3>Acessórios</h3>
            <p>{product.accessories}</p>
          </div>
        </div>
      </div>
      <div className="product-bottom-left">
            <h3>Especificações</h3>
            <p>{product.specifications}</p>
          </div>
      <div className="product-page">
      

        <h1 className="duvidas">Dúvidas?</h1>
        <div className='button-duvidas'>
          <button onClick={redirectToWhatsApp}>Fale com nosso time</button>
        </div>
      </div>

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
            <img src={logo_placeholder} alt="Logo" />
            <h4>© 2024. desenvolvido por Gabriel Barbosa Da Silva</h4>
          </div>
          <div className='footer-right'>
            <p> 
              Horário de funcionamento<br/>
              Seg - Sex / 9:00 - 18:00 Hs.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ProductPage;
