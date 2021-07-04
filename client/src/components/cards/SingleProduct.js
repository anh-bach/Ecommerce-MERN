import React, { Fragment } from 'react';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Tabs from 'antd/lib/tabs';
import StarRating from 'react-star-ratings';

import laptop from '../../images/laptop.png';
import ProductListItem from './ProductListItem';
import RatingModal from '../modal/RatingModal';
import showAverage from '../../functions/rating';

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;

  return (
    <Fragment>
      <div className='col-md-7'>
        {images && images.length > 0 && (
          <Carousel showArrows autoPlay infiniteLoop>
            {images.map((image) => (
              <img key={image.public_id} alt='product' src={image.url} />
            ))}
          </Carousel>
        )}
        {images && images.length === 0 && (
          <Card
            cover={
              <img src={laptop} alt='product' className='mb-3 card-image' />
            }
          ></Card>
        )}
        {!images && (
          <Card>
            <Skeleton active></Skeleton>
          </Card>
        )}
        <Tabs defaultActiveKey='1' type='card'>
          <TabPane tab='Description' key='1'>
            {description && description}
          </TabPane>
          <TabPane tab='More' key='2'>
            Call us on xxx-xxxx--xxx to learn more about the product
          </TabPane>
        </Tabs>
      </div>
      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className='text-center pb-3'>No rating yet</div>
        )}
        <Card
          className='p-1'
          actions={[
            <Fragment>
              <ShoppingCartOutlined className='text-success' />
              <br />
              Add to Cart
            </Fragment>,
            <Link to='#'>
              <HeartOutlined className='text-info' /> <br />
              Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor='red'
              />
            </RatingModal>,
          ]}
        >
          <ProductListItem product={product} />
        </Card>
      </div>
    </Fragment>
  );
};

export default SingleProduct;
