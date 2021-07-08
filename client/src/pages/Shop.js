import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from 'antd/lib/menu';
import Slider from 'antd/lib/slider';
import { DollarOutlined } from '@ant-design/icons';

import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import { SEARCH_QUERY } from '../actions/types';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  let { text } = search;
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  //1)).load products on page load by default
  useEffect(() => {
    loadAllProducts();
  }, []);

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

  //2)) Load products on user search input
  useEffect(() => {
    //if search is empty, get all products
    if (!text) loadAllProducts();
    //user enters search
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 500);

    return () => clearTimeout(delayed);
  }, [text]);

  //3))search on price slider
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ price });
    }, 500);

    return () => clearTimeout(delayed);
  }, [price]);
  // Load products on user input
  const fetchProducts = async (arg) => {
    try {
      const res = await fetchProductsByFilter(arg);
      setProducts(res.data);
    } catch (error) {
      console.log('From Shop - fetch products default', error.response);
    }
  };

  const handleSlider = (value) => {
    dispatch({ type: SEARCH_QUERY, payload: { text: '' } });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search/Filter</h4>
          <Menu mode='inline' defaultOpenKeys={['1', '2']}>
            <SubMenu
              key='1'
              title={
                <span className='h6'>
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className='mx-4'
                  tipFormatter={(value) => `$${value}`}
                  range
                  max='9999'
                  value={price}
                  onChange={(value) => handleSlider(value)}
                />
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className='col-md-9 pt-2'>
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
