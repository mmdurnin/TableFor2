import React from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import LoginUser from './login_user';

const msp = (state) => ({
    user: {
        email: "",
        password: ""
    },
    errors: state.errors.session
})

const mdp = dispatch => {
    return {
        login: (user) => dispatch(login(user)),
        otherForm: (
            <button className="button-modal" onClick={() => dispatch(openModal('signup'))}>
                Create an account
            </button>
        ),
        closeModal: () => {  
            dispatch(closeModal())
            dispatch(clearErrors())
        }
    };
};

export default connect(msp, mdp)(LoginUser)