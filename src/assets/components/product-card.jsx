import { Card } from "antd";
const { Meta } = Card
import { useNavigate } from "react-router-dom";
import placeholder from '../../assets/img/placeholder1.png';
import '../styles/product-card.css';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/product/${product._id}`); // Redirecionar pelo nome do produto
  };

  // Acessa o primeiro item do array de imagens, 
  const productImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <>

<div class="card">
        <div class="card-content">
        <img src={productImage ? productImage : placeholder} alt={product.name} style={{ width: '100%', height: 'auto' }}/>
            <h2 className="name">{product.name}</h2>
            <button onClick={handleViewMore}>VER MAIS</button>        
            </div>
    </div>

 
    </>
  );
}

export default ProductCard;
