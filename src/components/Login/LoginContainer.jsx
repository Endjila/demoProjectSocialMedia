import React from 'react';
import Login from './Login';
import { loginTC } from '../../redux/authReducer'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    }
};

const LoginContainer = connect(mapStateToProps, {loginTC})(Login);

export default LoginContainer;