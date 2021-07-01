import React, { Fragment } from 'react';

import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';

const Home = () => {
  return (
    <Fragment>
      <div className='jumbotron text-danger h1 text-center font-weight-bold'>
        <Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      </div>

      <h4 className='text-center p-3 my-5 display-4 jumbotron'>New Arrivals</h4>
      <NewArrivals />

      <h4 className='text-center p-3 my-5 display-4 jumbotron'>Best Sellers</h4>
      <BestSellers />
    </Fragment>
  );
};

export default Home;
