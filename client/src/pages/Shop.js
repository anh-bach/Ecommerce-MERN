import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../functions/product';
import ProductCard from '../components/cards/ProductCard';

const Shop = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  let { text } = search;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  //1.load products on page load by default
  useEffect(() => {
    loadAllProducts();
  }, []);
  //2)) Load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts(text);
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const res = await getProductsByCount(12);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log('From Shop - load all products default', error.response);
    }
  };

  const fetchProducts = async (text) => {
    try {
      const res = await fetchProductsByFilter({ query: text });
      setProducts(res.data);

      console.log('The end');
    } catch (error) {
      console.log('From Shop - fetch products default', error.response);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>Search/Filter menu</div>

        <div className='col-md-9'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4 className='text-danger'>Products</h4>
          )}

          {products.length < 1 && <p>No products found.</p>}
          {products.length && (
            <div className='row'>
              {products.map((product) => (
                <div key={product._id} className='col-md-4 mt-3'>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
