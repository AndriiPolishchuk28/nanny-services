import ComponentWithModal from '../ModalWrapper/ModalWrapper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './FormModal.module.css';
import { icons } from '../../assets';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const FormModal = ({ type, isOpen, isClose }) => {
  const [visible, setVisible] = useState(false);
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const handleVisiblePassword = () => setVisible(!visible);

  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div className={css.modal_wrapper}>
        <button onClick={isClose} className={css.btn_close}>
          <svg className={css.close}>
            <use href={`${icons}#icon-close`}></use>
          </svg>
        </button>
        <h2 className={css.login}>
          {type === 'Login' ? 'Log In' : 'Registration'}
        </h2>
        <p className={css.subtitle}>
          {type === 'Login'
            ? 'Welcome back! Please enter your credentials to access your account and continue your babysitter search.'
            : 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={css.form_wrapper}>
                {type === 'Registration' && (
                  <div className={css.input_wrapper}>
                    <label htmlFor="name"></label>
                    <Field
                      className={css.input}
                      type="name"
                      name="name"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={css.error}
                    />
                  </div>
                )}
                <div className={css.input_wrapper}>
                  <label htmlFor="email"></label>
                  <Field
                    className={css.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css.error}
                  />
                </div>
                <div className={css.input_wrapper}>
                  <label htmlFor="password"></label>
                  <div className={css.test}>
                    <Field
                      className={css.input}
                      type={!visible ? 'password' : 'text'}
                      name="password"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className={css.btn_eye}
                      onClick={handleVisiblePassword}
                    >
                      {visible ? (
                        <svg className={css.svg_eye}>
                          <use href={`${icons}#icon-eye`}></use>
                        </svg>
                      ) : (
                        <svg className={css.svg_eye}>
                          <use href={`${icons}#icon-eye-off`}></use>
                        </svg>
                      )}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="div"
                    className={css.error}
                  />
                </div>

                <button className={css.btn_submit} type="submit">
                  {type === 'Login' ? 'Send' : 'Sign Up'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ComponentWithModal>
  );
};

export default FormModal;
