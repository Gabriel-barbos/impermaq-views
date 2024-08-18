import '../styles/product-list.css'
import ProductCard from './product-card';
import  { useState, useEffect } from 'react';
import { fetchProducts } from '../../api';

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  <div className="space-align-container">
  {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
 
  </div>
};
export default ProductList;