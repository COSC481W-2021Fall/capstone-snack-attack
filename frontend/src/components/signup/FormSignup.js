import React from 'react';
import { Link } from 'react-router-dom';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='signupform' noValidate>
        <h2>
          Create your account
        </h2>

        <div className='signupform-inputs'>
          <label className='signupform-label'>Username</label>
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
        <div className='signupform-inputs'>
          <label className='signupform-label'>Password</label>
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
        <div className='signupform-inputs'>
          <label className='signupform-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>

        <div className='signupform-inputs'>
          <label className='signupform-label'>Store manager</label>
          <input  
            className='form-select'
            type='radio'
            name='userrole'
            checked={values.userrole === 'admin'}
            value='admin'
            onChange={handleChange}
          />  

          <label className='signupform-label'>Customer</label>
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

        <button className='signupform-input-btn' type='submit'>
          Sign up
        </button>
        <span className='signupform-input-login'>
          Already have an account? Login 
          <Link to="/login"> here</Link>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;