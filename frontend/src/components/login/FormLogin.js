import React from 'react';
import { Link } from 'react-router-dom';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

const FormLogin = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='loginform-content-right'>
      <form onSubmit={handleSubmit} className='loginform' noValidate>
        <h2 style={{color: 'white'}}>
          Welcome!
        </h2> 

        <div className='loginform-inputs'>
          <label className='loginform-label'>Username</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='loginform-inputs'>
          <label className='loginform-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>


        <div className='loginform-inputs'>
          <label className='loginform-label'>Store manager</label>
          <input  
            className='form-select'
            type='radio'
            name='userrole'
            checked={values.userrole === 'admin'}
            value='admin'
            onChange={handleChange}
          />  

          <label className='loginform-label'>Customer</label>
          <input  
            className='form-select'
            type='radio'
            name='userrole'
            checked={values.userrole === 'customer'}
            value='customer'
            onChange={handleChange}
          />

          {errors.userrole && <p>{errors.userrole}</p>}
        </div>  

        <button className='loginform-input-btn' type='submit'>
          Login
        </button>
        <span className='loginform-input-login'>
          Don't have an account? Sign up 
          <Link to="/register"> here</Link>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;