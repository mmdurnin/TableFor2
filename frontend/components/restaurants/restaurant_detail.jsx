import React from 'react';
import ReservationFormContainer from '../reservations/reservation_form';
import RestaurantOverview from './restaurant_overview';
import RestaurantShowNav from './restaurant_show_nav';
import ReviewIndex from '../reviews/review_index_container';
import ReviewForm from '../reviews/review_form_container';
import { HashLink as Link } from "react-router-hash-link";

class RestaurantDetail extends React.Component{
    constructor(props){
        super(props)

    }

    componentDidMount(){
        this.props.fetchRestaurant(this.props.match.params.restaurantId)
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.params.restaurantId !== this.props.match.params.restaurantId) {
          this.props.fetchRestaurant(this.props.match.params.restaurantId);
        }
    }

    render(){
        if (this.props.restaurant == null) return null;
        return (
          <div className="restaurant-show-window" id="restaurant-show-window">
            <div className="restaurant-show-header-grandparent">
              <div id="show-header-purple-screen"></div>
              <div className="restaurant-show-header">
                <img src={window.background_show} />
              </div>
            </div>

            <div className="restaurant-show-page">
              <div className="restaurant-show-main-container">
                <div className="show-main-options">
                  <Link to="#show-summary">
                    <div>Summary</div>
                  </Link>
                  <Link to="#show-photos">
                    <div>Photos</div>
                  </Link>
                  <Link to="#show-info">
                    <div>General Info</div>
                  </Link>
                  <Link to="#show-reviews">
                    <div>Reviews</div>
                  </Link>
                </div>

                <div className="section restaurant-show-name" id="section">
                  {this.props.restaurant.name}
                </div>

                <div
                  className="section restaurant-show-summary-section"
                  id="show-summary"
                >
                  <div className="restaurant-show-main-section-title">
                    Summary
                  </div>
                  <div className="restaurant-show-summary">
                    {this.props.restaurant.summary}
                  </div>
                </div>

                <div
                  className="section restaurant-show-image-section"
                  id="show-photos"
                >
                  <div className="restaurant-show-main-section-title">
                    Photos
                  </div>
                  <div className="restaurant-show-image-container">
                    <img src={this.props.restaurant.image} />
                  </div>
                </div>

                <div className="section" id="show-info">
                  <RestaurantOverview restaurant={this.props.restaurant} />
                </div>

                <div
                  className="section restaurant-show-reviews-section"
                  id="show-reviews"
                >
                  <div className="restaurant-show-main-section-title">
                    Reviews
                  </div>
                  <ReviewIndex restaurantId={this.props.restaurant.id} />
                  <ReviewForm restaurantId={this.props.restaurant.id} />
                </div>
              </div>

              <div className="restaurant-show-nav-container">
                <ReservationFormContainer
                  restaurant={this.props.restaurant}
                  restaurantId={this.props.restaurant.id}
                  fetchReservation={this.props.fetchReservation}
                  action={this.props.createReservation}
                  loggedIn={this.props.loggedIn}
                  user={this.props.user}
                  openModal={this.props.openModal}
                  history={this.props.history}
                  title={"Make a reservation"}
                  errors={this.props.errors}
                  restaurant={this.props.restaurant}
                />
                <RestaurantShowNav restaurant={this.props.restaurant} />
              </div>
            </div>
          </div>
        );
    }
}

export default RestaurantDetail;

