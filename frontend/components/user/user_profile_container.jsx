
import { connect } from 'react-redux';
import UserProfile from './user_profile';


const msp = (state) => {
    return {
    user: state.entities.users[state.session.id],
    reviews: state.entities.reviews
}}

const mdp = dispatch => ({
})

export default connect (msp, mdp)(UserProfile);