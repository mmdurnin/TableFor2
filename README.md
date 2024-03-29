# [TableFor2](http://tablefor2.herokuapp.com/#/)  <img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/tf2_logo.png" align="right" height="57" width="226" >
-------------

Welcome to TableFor2! TableFor2 is a web application inspired by OpenTable. This online platform features restaurants in several major US cities. With this app users can browse, search, review and reserve restaurants. See below for some of the exciting highlights of this project.

![Screenshot](https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/restaurant_show.png)







## Table of Contents
* [Features & Highlights](#Features-&-Highlights)
  * [Restaurant Search](#search)
  * [Reservations](#reservations)
  * [Ratings & Reviews](#reviews)
  * [User Profile](#profile)
  * [Custom Errors](#errors)
  * [Responsive Design](#responsive)
* [Technologies](#Technologies)
* [Installation](#Installation)
* [Credits](#Seed-Sources)
* [Links](#Links)


## <a id="Features-&-Highlights"></a>Features & Highlights ##

### <a id="search"></a>Public access to restaurant browsing via filtered and/or keyword search ###

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_gifs/t.partial_search.gif" height="222" width="382" alt="Keyword Search">  <img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_gifs/t.filtered_search.gif" height="222" width="445" alt="Search by city" > 
*Restaurant search by title (left); restaurant search by dropdown (right)*    
*Note: it is possible to use dropdown filters and keyword in a single search*  



The app's restaurant search bar sends two parameters to the backend: city ID (with a default value of 1: San Francisco) and restaurant name (optional).  

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_snippets/t.snippet_search_actions2.png" width="100%" > *Restaurant action dispatches "fetch restaurants" with two parameters*    




<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_snippets/t.snippet_search_util.png" width="100%" > *API call to the restaurants controller, parameters included in query string*    

The index action includes an active record query for a matching city ID and any restaurant with a name that contains the search term, allowing for partial, case-insensitive search. The active record query is sanitized to protect against potential malicious user activity (e.g., SQL injection attacks).

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_snippets/t.snippet_search_controller_sanitized.png" width="100%" > *Index action on the restaurants controller*    

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_snippets/t.snippet_frontend_query.png" width="60%" align="right" >    

The other search parameters are carried over directly to the restaurants index page. This is achieved by tacking a query string onto a route (/restaurants), defined on the master component. A future implementation will include real reservation search. 

The ternary logic in the snippet to the right is as follows: the state is set to an empty string when the component mounts. If it is still an empty string on submit, assign state ID to 1, otherwise assign state ID to the state that has been selected by the user.

*Search form component (right)*

### <a id="reservations"></a>User-authenticated access to reservations ###

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_gifs/t.create_reservation.gif" width="60%" align="right" >  

Reservations are created on the restaurant show page. On creating a new reservation, a handle submit function checks if there exists a current session id. If not, the open modal (type "log in") action is called to encourage the user to sign in. Model and database-level contstraints are in place to check that number of guests, time and reservation are not blank. On successfully submitting a new reservation, the user is redirected to their profile page which summarizes their upcoming reservations. This page renders all future reservations, in order from soonest to furthest in the future.

From the reservations summary page, a user also has access to updating and/or deleting their reservations. Two separate reservation actions are referenced on the reservation form container (update/ delete), both of which require an AJAX call to their respective actions on the backend reservations controller.

### <a id="reviews"></a>Restaurant ratings and reviews ###

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_gifs/create_review.gif" width="60%" align="left" >

Also on the restaurant show page is a list of all reviews. The fetch reviews frontend action is triggered on mount of the component. The route to the reviews index action on the backend is nested under restaurants. As such, the AJAX call to fetch restaurants includes restaurant ID in the query string -- url: `/api/restaurants/${restaurantId}/reviews`, and the index action on the reviews controller filters reviews by restaurant ID. Each item on the list of restaurant reviews includes the name of the user who created the review. To limit the number of N + 1 queries to the database, the call to grab this batch of reviews "includes" user, which preloads associated user records (this prevents a call to the "users" database for every single review).

The create review form exists on this same restaurant show page. If a user is not logged in on submitting the review form, the log in modal will open, preventing the user from submitting. Creating a new review triggers a state change, rerendering the list of reviews directly above the form which will then include the submitted review.

### <a id="profile"></a>User profile featuring reservations and reviews ###

Logged in users have access to their upcoming reservations and the restaurant reviews that they have submitted via their user profile. This is accessed by a static button that shows the name of the user in the upper righthand corner of the app.

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_snippets/t.snippet_profile_1.png" width="60%" align="right" >

The user profile contains two tabs which are rendered based on click logic: add class ("active") to the "clicked" tab and remove the active class from the previous tab. This serves to change the styling of the active tab itself. The onclick function also changes the profile component's local state "tab". On click of reservations sets "tab" to 0; on click of reviews sets "tab" to 1. Further down, an array of two components is defined. In the render function a div holds a reference to the array at the index number defined by state.

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_snippets/t.snippet_profile_2.png" width="100%" >

The User Reservations tab triggers the fetch reservations action. On the reservations controller, costs are reduced again by using the ".includes(:restaurant)". This is necessary because each reservation item requires additional information on the restaurant. The bulk of the logic for sorting reservations in descending order, filtering out past reservations, grabbing reservations based on current user is done on the index action of the reservations controller with this single active record query:

@reservations = current_user.reservations
            .includes(:restaurant)
            .where('starts_at > ?', DateTime.now)
            .order(id: :desc)
            
A future implementation will render both upcoming and past reservations, sorted into separate categories with an option for the user to leave a review on the restaurants in which they have previously "dined".

The user reviews tab triggers an AJAX call to a custom Rails route ("user_reviews"). This is similar to the reviews index action but instead of filtering by restaurant ID, reviews are filtered by current user.


### <a id="errors"></a>Custom error handling ###

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshots/custom_errrors_1.png" width="40%" align="right" >

Standard database constraints and model-level validations are in place to ensure that all required fields are provided. In addition to these constraints and validations (null: false / presence: true), custom errors are included on the reservation model. 

Because of these additional validations, users are prevented from creating a second reservation for the same date/ time. Users are also prevented from creating a reservation in the past. However, this can also be achieved by setting a minimum on the date input of the date today. This second method of ensuring a future reservation date is used on the project's "update reservation" form on the user profile. Creating a custom error for this was more challenging as it required multiple conversions of PSQL, Ruby, and Javascript date-time objects and strings, but ultimately was more rewarding because it allows for flexibility in styling and content of the error message.

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_snippets/t.snippet_custom_validations_errors.png" width="100%" align="left" >  

### <a id="responsive"></a>Responsive design ###

This app maintains a visually appealling experience on all devices and among all window resizes. This is achieved through media queries, flexbox, overflow properties, and setting minimum and maximum widths. For instance, when the window is pushed into a width of 1000px or less, the reservation form on the restaurant show page disappears from the right side bar and is recreated at the bottom of the page. 

<img src="https://github.com/mmdurnin/TableFor2/blob/master/app/assets/images/screenshot_gifs/resize.gif" width="100%" align="left" >  

## <a id="Technologies"></a>Technologies ##

This project was built using the following technologies:
* PostgreSQL
* Ruby on Rails
* Javascript
* React & Redux
* CSS3

## <a id="Installation"></a>Installation ##

From the command line:
* bundle install
* npm install
* bundle exec rails db:create
* bundle exec rails db:seed

(To launch the app from local server: )
* rails server
* npm start

*Please note that the images for this project are stored on a private AWS account. Those interested in cloning the app will need to collect their own seed images.*

## <a id="Seed-Sources"></a>Seed Data Sources & Credits ##  

* Fonts   
[Google Fonts](https://fonts.google.com/)  

* Icons   
[Font Awesome](https://fontawesome.com/)  

* Images    
[Pexels](https://www.pexels.com/search/restaurants/)  
[Unsplash](https://unsplash.com/s/photos/restaurant)  

* Restaurant Summaries    
[Yelp, Indianapolis](https://www.yelp.com/search?find_desc=Restaurants&find_loc=Indianapolis%2C+IN)  

* Restaurant Names  
[Japanese restaurant Names, Savor Japan](https://savorjapan.com/)  
Some of the French restaurants are real restaurants in Paris (e.g., Chez Gladines)  
(Most are made up)

* Restaurant Phone Numbers    
P-O-P-C-O-R-N (sf)  
McDonalds, San Francisco  
Call and Oates number  
[Fake phone number generator](https://fakenumber.org/)  

* Restaurant Addresses    
[Fake address generator](https://www.fakeaddressgenerator.com/usa_address_generator)


Real San Francisco restaurant info was collected from [Yelp, San Francisco](https://www.yelp.com/search?find_desc=Restaurants&find_loc=San+Francisco%2C+CA)


## <a id="Links"></a>Links ##  
[Visit TableFor2](http://tablefor2.herokuapp.com/#/)
