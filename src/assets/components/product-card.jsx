import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import placeholder from '../../assets/img/placeholder1.png';
import '../styles/product-card.css';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/product/${product._id}`); // Redirecionar pelo nome do produto
  };

  // Acessa o primeiro item do array de imagens, que agora é um URL completo
  const productImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <>
      <Card
        style={{
          width: 300,
          padding: 10,
        }}
      >
        <div className="product-container">
          {/* Verifica se a primeira imagem existe, se não, usa a placeholder */}
          <img src={productImage ? productImage : placeholder} alt={product.name} style={{ width: '100%', height: 'auto' }}/>
          <p className="name">{product.name}</p>
          <button onClick={handleViewMore}>VER MAIS</button>
        </div>
      </Card>
    </>
  );
}

export default ProductCard;
