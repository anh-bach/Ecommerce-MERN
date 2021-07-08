import React, { Fragment } from 'react';
import Card from 'antd/lib/card';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import laptop from '../../images/laptop.png';
import showAverage from '../../functions/rating';
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, slug, title, description, price } = product;
  return (
    <Fragment>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className='text-center pt-1 pb-3'>No rating yet</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length > 0 ? images[0].url : laptop}
            alt='product'
          />
        }
        style={{ objectFit: 'cover' }}
        className='p-1'
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className='text-warning' /> <br /> View Product
          </Link>,
          <Fragment>
            <ShoppingCartOutlined className='text-danger' />
            <br /> Add to Cart{' '}
          </Fragment>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 30)}...`}
        />
      </Card>
    </Fragment>
  );
};

export default ProductCard;
