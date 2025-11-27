import { useState } from 'react';
import placeholder from '../../assets/img/placeholder1.png';
import '../styles/productAdmin.css';
import { Modal, message, Popconfirm, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PictureOutlined } from '@ant-design/icons';
import EditProductForm from './EditProductForm';

const ProductAdmin = ({ product, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const productImage = product.images && product.images.length > 0 ? product.images[0] : null;
  const imageCount = product.images ? product.images.length : 0;

  // Função para mostrar o modal de edição
  const showModal = () => {
    setOpen(true);
  };

  // Função para fechar o modal de edição
  const handleCancel = () => {
    setOpen(false);
  };

  const handleEditSuccess = () => {
    setOpen(false);
    message.success('Produto atualizado com sucesso!');
    // Recarrega a página após 500ms para mostrar as alterações
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://backend-api-gold-mu.vercel.app/api/products/${product._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir produto');
      }

      message.success('Produto excluído com sucesso!');
      onDelete(product._id);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div className="product-card-admin">
        {/* Badge de imagens */}
        <div className="image-badge">
          <PictureOutlined />
          <span>{imageCount}</span>
        </div>

        {/* Tag de condição */}
        <div className="condition-tag">
          <Tag color={
            product.condition === 'Novo' ? 'green' : 
            product.condition === 'Usado' ? 'orange' : 
            'blue'
          }>
            {product.condition || 'N/A'}
          </Tag>
        </div>

        {/* Imagem do produto */}
        <div className="product-image-container">
          <img 
            src={imageError || !productImage ? placeholder : productImage} 
            alt={product.name}
            onError={handleImageError}
            className="product-image"
          />
          <div className="image-overlay">
            <Tooltip title="Visualizar produto">
              <EyeOutlined className="overlay-icon" />
            </Tooltip>
          </div>
        </div>

        {/* Informações do produto */}
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          
          {product.description && (
            <p className="product-description">
              {product.description.length > 80 
                ? `${product.description.substring(0, 80)}...` 
                : product.description}
            </p>
          )}
        </div>

        {/* Botões de ação */}
        <div className="product-actions">
          <button 
            className="action-btn edit-btn" 
            onClick={showModal}
            disabled={loading}
          >
            <EditOutlined />
            <span>Editar</span>
          </button>

          <Popconfirm
            title="Excluir produto"
            description="Tem certeza que deseja excluir este produto?"
            onConfirm={handleDelete}
            okText="Sim, excluir"
            cancelText="Cancelar"
            okButtonProps={{ danger: true }}
          >
            <button 
              className="action-btn delete-btn"
              disabled={loading}
            >
              <DeleteOutlined />
              <span>Excluir</span>
            </button>
          </Popconfirm>
        </div>
      </div>

      {/* Modal de edição */}
      <Modal
        open={open}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <EditOutlined />
            <span>Editar Produto</span>
          </div>
        }
        onCancel={handleCancel}
        footer={null}
        width={700}
        destroyOnClose
      >
        <EditProductForm product={product} onSuccess={handleEditSuccess} />
      </Modal>
    </>
  );
};

export default ProductAdmin;