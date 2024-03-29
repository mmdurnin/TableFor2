import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link
  } from 'react-router-dom';

import Modal from './modal/modal'
import Header from './header/header';
import Footer from './footer/footer';
import HomeContainer from './home/home_container';
import RestaurantDetailContainer from './restaurants/restaurant_detail_container';
import RestaurantIndexContainer from './restaurants/restaurant_index_container';
import UserProfileContainer from './user/user_profile_container';

const App = () => (
    <div className="column">
        <Modal />
        <Header />
        <Switch>
            <Route path="/profile" component={UserProfileContainer} />
            <Route path="/restaurants/:restaurantId" component={RestaurantDetailContainer} />
            <Route path="/restaurants" component={RestaurantIndexContainer} />
            <Route path="/" component={HomeContainer} />
        </Switch>
        <Footer />
    </div>
);

export default App;