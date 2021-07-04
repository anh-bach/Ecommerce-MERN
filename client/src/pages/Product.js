import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { getProduct, productStar } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [star, setStar] = useState(0);

  const { slug } = useParams();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    loadSingleProduct(slug);
  }, []);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObj = product.ratings.find(
        (el) => el.postedBy.toString() === user._id.toString()
      );

      existingRatingObj && setStar(existingRatingObj.star);
    }
  }, [user, product.ratings]);

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

  const onStarClick = async (newRating, name) => {
    try {
      setStar(newRating);
      await productStar(name, newRating, user.token);
      loadSingleProduct(slug);
    } catch (error) {
      console.log('From product on star click', error.response);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
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
