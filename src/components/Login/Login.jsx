import React from 'react';
import LoginReduxForm from './LoginForm';
import { Navigate } from "react-router-dom";
import styles from './Login.module.css'

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div className={styles.loginWrapper}>
            <h1>Login</h1>
            <div>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
            </div>
        </div>
    )
}

export default Login;