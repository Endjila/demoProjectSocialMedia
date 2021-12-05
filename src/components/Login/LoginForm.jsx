import React from 'react';
import { reduxForm } from 'redux-form';
import { required } from '../../utils/validators';
import { Input, createField } from '../common/FormsControls/FormsControls';
import style from '../common/FormsControls/FormsControls.module.css'
import styles from './Login.module.css'
import Button from '../common/Button/Button'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField(Input, "Email", "email", [required])}
            </div>
            <div>
                {createField(Input, "Password", "password", [required], { type: "password" })}
            </div>
            <div className={styles.rememberMe}>
                <b>Remember me</b>
                <div className={styles.rememberMe}>{createField(Input, null, "rememberMe", [], { type: "checkbox"}, "")}</div>
            </div>
            {!!props.captchaUrl && <img src={props.captchaUrl} />}
            {!!props.captchaUrl && createField(Input, "Symbols from captcha", "captcha", [required]) }
            {!!props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button className={styles.buttonSignIn}><Button buttonName={"Sign in"}/></button> 
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default LoginReduxForm;