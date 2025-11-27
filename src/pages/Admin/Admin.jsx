import './admin.css';
import { Button, Modal, Form, Input, message, Spin, Empty } from 'antd';
import { PlusOutlined, SettingOutlined, ReloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../api';
import ProductAdmin from '../../assets/components/product-admin';
import CreateProductForm from '../../assets/components/CreateProductForm';

const { TextArea } = Input;

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminData, setAdminData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  // Função para buscar dados do admin
  const fetchAdminData = async () => {
    try {
      const response = await fetch('https://backend-api-gold-mu.vercel.app/api/admin');
      const data = await response.json();
      setAdminData(data);
      form.setFieldsValue(data);
    } catch (error) {
      message.error('Falha ao carregar dados do admin');
    }
  };

  const showModal2 = () => {
    setIsModalOpen(true);
    fetchAdminData();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel2 = () => {
    setIsModalOpen(false);
  };

  const handleAdminSubmit = async (values) => {
    try {
      const response = await fetch('https://backend-api-gold-mu.vercel.app/api/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar dados do admin');
      }

      message.success('Dados atualizados com sucesso!');
      setIsModalOpen(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const products = await fetchProducts();
      setProducts(products);
      setError(null);
    } catch (error) {
      setError(error.message);
      message.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
    message.success('Produto removido com sucesso!');
  };

  const handleRefresh = () => {
    getProducts();
    message.info('Atualizando lista de produtos...');
  };

  return (
    <div className="admin-page-wrapper">
      {/* Header com título e botões */}
      <div className="admin-container">
        <div className="admin-page">
          <h1>Gestão de Produtos</h1>
        </div>

        <div className='admin-buttons'>
          <Button 
            type="default" 
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            title="Atualizar lista"
          >
            Atualizar
          </Button>

          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={showModal}
          >
            Adicionar Novo
          </Button>

          <Button 
            type="default" 
            icon={<SettingOutlined />}
            onClick={showModal2}
            title="Configurações"
          />
        </div>
      </div>

      {/* Modal de Adicionar Produto */}
      <Modal
        open={open}
        title="Adicionar Novo Produto"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
        width={600}
      >
        <CreateProductForm onSuccess={() => {
          getProducts();
          handleCancel();
        }} />
      </Modal>

      {/* Modal de Configurações */}
      <Modal 
        title="Configurações do Admin" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel2}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: 600 }}
          onFinish={handleAdminSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira o email' },
              { type: 'email', message: 'Email inválido' }
            ]}
          >
            <Input placeholder="admin@exemplo.com" />
          </Form.Item>

          <Form.Item
            label="Telefone"
            name="telefone"
            rules={[{ required: true, message: 'Por favor, insira o telefone' }]}
          >
            <Input placeholder="+55 (11) 99999-9999" />
          </Form.Item>

          <Form.Item 
            label="Sobre" 
            name="sobre"
            rules={[{ required: true, message: 'Por favor, insira uma descrição' }]}
          >
            <TextArea rows={4} placeholder="Descrição sobre a loja..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* Lista de Produtos */}
      {loading ? (
        <div className="admin-status-container">
          <Spin size="large" tip="Carregando produtos..." />
        </div>
      ) : error ? (
        <div className="admin-status-container">
          <Empty
            description={
              <span>
                Erro ao carregar produtos: {error}
                <br />
                <Button type="primary" onClick={getProducts} style={{ marginTop: '1rem' }}>
                  Tentar Novamente
                </Button>
              </span>
            }
          />
        </div>
      ) : products.length === 0 ? (
        <div className="admin-status-container">
          <Empty
            description="Nenhum produto cadastrado"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Adicionar Primeiro Produto
            </Button>
          </Empty>
        </div>
      ) : (
        <div className="space-align-container">
          {products.map((product) => (
            <ProductAdmin 
              key={product._id} 
              product={product} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;