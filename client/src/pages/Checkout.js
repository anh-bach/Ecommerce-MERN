import React from 'react';

const saveAddressToDb = () => {
  //
};

const Checkout = () => {
  return (
    <div className='row mt-2'>
      <div className='col-md-6'>
        <h4>Delivery Address</h4>
        <br />
        <textarea></textarea>
        <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
      </div>
      <div className='col-md-6'>
        <h4>Order Summary</h4>
        <hr />
        <p>Products</p>
        <hr />
        <p>List of Products</p>
        <hr />
        <p>Cart Total: $x</p>

        <div className='row'>
          <div className='col-md-6'>
            <button className='btn btn-primary'>Place Order</button>
          </div>
          <div className='col-md-6'>
            <button className='btn btn-primary'>Empty Card</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;