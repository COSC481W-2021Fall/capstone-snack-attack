import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>
          <Link to="/">x</Link>
        </span>
        <div className='form-content-left'>
          <div className="form-title">CrossAmazon</div>
          <img className='form-img' src='/img/img-2.svg' alt='leaf' />
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;