import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { getProduct } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    loadSingleProduct(slug);
  }, []);

  const loadSingleProduct = async (slug) => {
    try {
      setLoading(true);
      const res = await getProduct(slug);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.log('From load Single Product', error.response);
      setLoading(false);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct product={product} />
      </div>
      <div className='row'>
        <div className='col text-center py-5'>
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
