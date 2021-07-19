import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from 'antd/lib/menu';
import Slider from 'antd/lib/slider';
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox';

import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../functions/product';
import { getCategories } from '../functions/category';
import ProductCard from '../components/cards/ProductCard';
import { SEARCH_QUERY } from '../actions/types';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  let { text } = search;
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 9999]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  //1)).load products on page load by default
  useEffect(() => {
    loadAllProducts();
    loadCategories();
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
    //clear other state first
    dispatch({ type: SEARCH_QUERY, payload: { text: '' } });
    setSelectedCategories([]);

    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //4))Search on product category
  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.log('From loadcatgories Shop.js', error.response);
    }
  };

  const handleCheck = async (e) => {
    try {
      //clear other state
      dispatch({ type: SEARCH_QUERY, payload: { text: '' } });
      setPrice([0, 9999]);
      //hanlde selectedCategories check and avoid duplicated categories in the state
      let inTheState = [...selectedCategories];
      let justChecked = e.target.value;
      let foundInTheState = inTheState.indexOf(justChecked);
      foundInTheState < 0
        ? inTheState.push(justChecked)
        : inTheState.splice(foundInTheState, 1);
      setSelectedCategories(inTheState);
      await fetchProducts({ category: inTheState });
    } catch (error) {
      console.log('From handle check categories Shop.js', error.response);
    }
  };

  const showCategories = () =>
    categories.map((category) => (
      <div key={category._id}>
        <Checkbox
          className='pb-2 pl-4 pr-4'
          value={category._id}
          onChange={handleCheck}
          name='category'
          checked={selectedCategories.includes(category._id)}
        >
          {category.name}
        </Checkbox>
      </div>
    ));

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search/Filter</h4>
          <Menu mode='inline' defaultOpenKeys={['1', '2']}>
            {/* Price Range */}
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
            {/* categories */}
            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div>{categories.length && showCategories()}</div>
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
