import React from 'react';
import { Field } from 'redux-form';
import styles from './FormsControls.module.css'

export const Textarea = ({ input, meta, ...props }) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={hasError ? styles.error : ""}>
            <div>
                <textarea {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input = ({ input, meta, ...props }) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={hasError ? styles.error : ""}>
            <div>
                <input {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const createField = (component, placeholder, name, validators, props = {}, text = "") => {
    return (
        <div>
            <Field placeholder={placeholder} name={name} validate={validators}
                component={component} {...props} /> {text}
        </div>
    )
}