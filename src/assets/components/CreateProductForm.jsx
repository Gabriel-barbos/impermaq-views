import { Form, Input, Radio, Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';

const { TextArea } = Input;

const CreateProductForm = () => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'padrao'); // Substitua 'your_upload_preset' pelo seu preset de upload

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dcafl8a98/image/upload',
      formData
    );

    return response.data.secure_url; // Retorna o URL seguro da imagem no Cloudinary
  };

  const handleSubmit = async (values) => {
    try {
      setUploading(true);

      const uploadedImageUrls = await Promise.all(
        values.images.map((file) => uploadToCloudinary(file.originFileObj))
      );

      const productData = {
        ...values,
        images: uploadedImageUrls, // Substitui o array de arquivos pelo array de URLs
      };

      const response = await fetch('https://backend-api-gold-mu.vercel.app/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to create product');
      }

      message.success('Produto criado com sucesso!');
      form.resetFields();
      window.location.reload();
    } catch (error) {
      message.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      initialValues={{
        condition: 'Novo',
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Imagens"
        name="images"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload listType="picture-card" beforeUpload={() => false} multiple>
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
              Adicionar Imagens
            </div>
          </button>
        </Upload>
      </Form.Item>

      <Form.Item label="Descrição" name="description">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Detalhes" name="specifications">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Acessórios" name="accessories">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Condição" name="condition">
        <Radio.Group>
          <Radio value="Novo">Novo</Radio>
          <Radio value="Usado">Usado</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={uploading}>
          Criar Produto
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProductForm;
