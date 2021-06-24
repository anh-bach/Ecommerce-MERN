import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category';

import AdminNav from '../../../components/nav/AdminNav';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createCategory(name, user.token);
      console.log(res);

      setLoading(false);
      setName('');
      console.log('passing to toast');
      toast.success(`${res.data.name} is created.`);
    } catch (error) {
      console.log('from create category', error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
      </div>
      <button className='btn btn-outline-primary'>Save</button>
    </form>
  );

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Create category</h4>
          {categoryForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
