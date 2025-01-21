import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../SCHEMAS/registerSchema.js'; 

import { register } from '../AREDUX/AuthRedux/operations.js'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import css from "./registerForm.module.css";

const RegisterForm = () => {

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    
      const { confirmPassword, ...payload } = values;
      console.log("Payload to be sent:", payload);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      console.log("Before dispatch...");
      await dispatch(register(payload)).unwrap();
      
      setSuccessMessage('User registered successfully!');
      resetForm(); 
    } catch (error) {
      console.error("Error during registration:", error); 
      setErrorMessage(error || 'Registration failed!');
    } finally {
      console.log("Finished submission");
      setSubmitting(false);
    }
  };

  return (
    
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      
    >
      {({ isSubmitting }) => (
        <div className={css.registerFormContainer}>
        <Form  className={css.registerFormChild}>
          <div>
            <div className={css.registerTop}>
            <p className={css.registrationWord}>Registration</p>
            
            <button type='button' onClick={()=> navigate("/auth/login")}className={css.loginRegisterPgBtn}>Log in</button>
            </div>
            <label htmlFor="username" className={css.labelForm}>Enter your name</label>
            <Field
              type="text"
              name="username"
              id="username"
              placeholder="Enter your name"
              className ={css.registerField}
            />
            <ErrorMessage name="username" component="div" className={css.error} />
          </div>

          <div>
            <label htmlFor="email" className={css.labelForm} >Enter your email</label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className ={css.registerField}
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <div>
            <label htmlFor="password" className={css.labelForm}>Create a password</label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Create a password"
              className ={css.registerField}
            />
            <ErrorMessage name="password" component="div" className={css.error} />
          </div>

          <button type="submit" disabled={isSubmitting} className={css.registerBtnPgRegister}>
            {isSubmitting ? 'Registering...' : 'Register Now'}
          </button>
          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className={css.error}>{errorMessage}</p>}
         
        </Form>
        </div>
      )}
    </Formik>
  
  );
};

export default RegisterForm;