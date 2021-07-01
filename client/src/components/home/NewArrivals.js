import React, { useState, useEffect } from 'react';

import { ListProducts } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const res = await ListProducts('createdAt', 'descending', 3);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log('From NewArrivals loading products', error.response);
    }
  };

  return (
    <div className='container'>
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className='row'>
          {products.map((product) => (
            <div className='col-md-4' key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
