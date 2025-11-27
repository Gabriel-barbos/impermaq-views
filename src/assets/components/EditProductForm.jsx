import { useEffect } from 'react';
import { Form, Input, Radio, Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const EditProductForm = ({ product, onSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      nome: product.name,
      descricao: product.description,
      detalhes: product.specifications,
      acessorios: product.accessories,
      condicao: product.condition,
      imagens: product.images.map((url, index) => ({
        uid: `-${index}`, //UID negativo para imagens existentes
        name: `image-${index}`,
        status: 'done',
        url: url
      }))
    });
  }, [product, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.nome);
      formData.append('description', values.descricao);
      formData.append('specifications', values.detalhes);
      formData.append('accessories', values.acessorios);
      formData.append('condition', values.condicao);

      // Separar imagens existentes das novas
      const existingImages = [];
      const newImages = [];

      if (values.imagens && values.imagens.length > 0) {
        values.imagens.forEach((file) => {
          // Se tem originFileObj, é uma nova imagem
          if (file.originFileObj) {
            newImages.push(file.originFileObj);
          } 
          // Se tem URL mas não tem originFileObj, é uma imagem existente
          else if (file.url) {
            existingImages.push(file.url);
          }
        });
      }

      // Adicionar novas imagens ao FormData
      newImages.forEach((file) => {
        formData.append('images', file);
      });

      // Enviar as URLs das imagens existentes que devem ser mantidas
      formData.append('existingImages', JSON.stringify(existingImages));

      // Detectar imagens que foram removidas (estavam no produto original mas não estão mais na lista)
      const imagesToRemove = product.images.filter(url => !existingImages.includes(url));
      formData.append('imagesToRemove', JSON.stringify(imagesToRemove));

      console.log('Dados sendo enviados:');
      console.log('- Imagens existentes mantidas:', existingImages);
      console.log('- Novas imagens:', newImages.length);
      console.log('- Imagens removidas:', imagesToRemove);

      const response = await fetch(`https://backend-api-gold-mu.vercel.app/api/products/${product._id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao atualizar produto');
      }

      message.success('Produto atualizado com sucesso!');
      onSuccess();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      message.error(error.message);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ maxWidth: 600 }}
      initialValues={{
        condicao: 'Novo',
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Nome"
        name="nome"
        rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}
      >
        <Input placeholder="Nome do produto" />
      </Form.Item>

      <Form.Item
        label="Imagens (máximo 10)"
        name="imagens"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Você pode adicionar até 10 imagens"
      >
        <Upload
          listType="picture-card"
          beforeUpload={() => false}
          maxCount={10}
          multiple
        >
          <button
            style={{
              border: 0,
              background: 'none',
            }}
            type="button"
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Adicionar
            </div>
          </button>
        </Upload>
      </Form.Item>

      <Form.Item 
        label="Descrição" 
        name="descricao"
        rules={[{ required: true, message: 'Por favor, insira a descrição!' }]}
      >
        <TextArea rows={4} placeholder="Descreva o produto..." />
      </Form.Item>

      <Form.Item label="Detalhes" name="detalhes">
        <TextArea rows={4} placeholder="Especificações técnicas..." />
      </Form.Item>

      <Form.Item label="Acessórios" name="acessorios">
        <TextArea rows={4} placeholder="Acessórios inclusos..." />
      </Form.Item>

      <Form.Item 
        label="Condição" 
        name="condicao"
        rules={[{ required: true, message: 'Selecione a condição!' }]}
      >
        <Radio.Group>
          <Radio value="Novo">Novo</Radio>
          <Radio value="Usado">Usado</Radio>
          <Radio value="Retrofitado">Retrofitado</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Salvar Alterações
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductForm;