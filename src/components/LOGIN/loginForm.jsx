import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchema } from '../SCHEMAS/validationSchema';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../AREDUX/AuthRedux/operations';

import css from './loginForm.module.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Form values:', values);
    try {
      const response = await dispatch(login(values));
      console.log('Full server response:', response);
      if (response.error) {
        console.error('Login error:', response.error);
        alert('Login failed! Please check your credentials and try again.');
        return;
      }

      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed! Please check your credentials and try again.');
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className={css.loginContainer}>
          <Form className={css.loginFormChild}>
            <div className={css.loginTop}>
              <button
                type="button"
                onClick={() => navigate('/auth/register')}
                className={css.loginRegisterBtn}
              >
                Registration
              </button>
              <p className={css.LoginW}>Log In</p>
            </div>
            <div className={css.formElements}>
              <label htmlFor="email" className={css.labelForm}>
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="email"
                className={css.loginField}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            <div>
              <label htmlFor="password" className={css.labelForm}>
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Confirm a password"
                autoComplete="current-password"
                className={css.loginField}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={css.loginBtnPgLogin}
            >
              {isSubmitting ? 'Logging in...' : 'Login In Now'}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
