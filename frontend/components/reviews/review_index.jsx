import React from 'react';
import ReviewIndexItem from './review_index_item'

class ReviewIndex extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchReviews(this.props.restaurant.id)
    }

    // componentDidUpdate(){

    // }

    render() {
        if (this.props.reviews.length === 0) return null;
        console.log(this.props)
        return(

            <div className="review-index-container">
                <ul>
                    {
                        this.props.reviews.map((el, i) => {
                            <ReviewIndexItem key={i} review={el} restaurant={this.props.restaurant} />
                        })
                    }
                </ul>
            </div>

        )
    }

}

export default ReviewIndex;