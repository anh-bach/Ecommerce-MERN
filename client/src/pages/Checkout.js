import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getUserCart, emptyUserCart, saveUserAddress } from '../functions/user';
import { ADD_TO_CART } from '../actions/types';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    loadProducts();
  }, [user]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getUserCart(user.token);

      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      setLoading(false);
    } catch (error) {
      console.log('from Checkout Load Products', error);
    }
  };

  const emptyCart = async () => {
    if (typeof window !== 'undefined') {
      try {
        setLoading(true);
        //remove from localStorage
        localStorage.removeItem('cart');
        //remove from redux
        dispatch({ type: ADD_TO_CART, payload: [] });
        //remove from backend
        await emptyUserCart(user.token);
        setProducts([]);
        setTotal(0);
        toast.success('Cart is empty. Continue Shopping');
        setLoading(false);
      } catch (error) {
        console.log('From empty cart', error);
      }
    }
  };

  const saveAddressToDb = async () => {
    try {
      if (!address) {
        toast.error('Please Fill In Your Address to proceed the order');
        return;
      }
      const res = await saveUserAddress(
        user.token,
        address.slice(3, address.length - 4)
      );

      if (res.data.ok) {
        setAddressSaved(true);
        toast.success('Address Saved');
      }
    } catch (error) {
      console.log('From save address', error);
    }
  };

  return (
    <div className='row mt-2 px-2'>
      <div className='col-md-6'>
        <h4>Delivery Address</h4>
        <br />
        <ReactQuill theme='snow' value={address} onChange={setAddress} />
        <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <hr />
      </div>
      <div className='col-md-6'>
        {loading ? (
          <h4 className='text-danger'>Loading...</h4>
        ) : (
          <h4>Order Summary</h4>
        )}
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {products.length > 0 &&
          products.map((item, index) => (
            <div key={index}>
              <p>
                {item.product.title} ({item.color}) x {item.count} = $
                {item.product.price * item.count}
              </p>
            </div>
          ))}

        <hr />
        <p>Cart Total: ${total}</p>

        <div className='row'>
          <div className='col-md-6'>
            <button
              className='btn btn-primary'
              disabled={!addressSaved || !products.length}
            >
              Place Order
            </button>
          </div>
          <div className='col-md-6'>
            <button
              className='btn btn-primary'
              onClick={emptyCart}
              disabled={!products.length}
            >
              Empty Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
