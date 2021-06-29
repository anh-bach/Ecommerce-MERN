import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav';
import { getProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  categories: [],
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

const ProductUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubs, setShowSubs] = useState(false);

  const user = useSelector((state) => state.user);
  const { slug } = useParams();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await getProduct(slug);
      setValues({ ...values, ...res.data });
      //load categories
      await loadCategories();
      setLoading(false);
    } catch (error) {
      console.log('From Product update load product', error.response);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setValues({ ...values, categories: res.data });
    } catch (error) {
      console.log('from load categories', error.response);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = () => {};

  const handleCategoryChange = async (e) => {
    setValues({ ...values, subs: [], category: e.target.value });
    try {
      const res = await getCategorySubs(e.target.value);
      setSubOptions(res.data);
      console.log(subOptions);
      setShowSubs(true);
    } catch (error) {
      console.log('From handleCategoryChange', error.response);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Update Product</h4>
          <ProductUpdateForm
            values={values}
            setValues={setValues}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
