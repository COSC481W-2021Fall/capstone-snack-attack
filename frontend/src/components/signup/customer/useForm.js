import { useState, useEffect } from 'react';
import UserActions from "../../../services/userAction";



const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    isAdmin: 'no'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    
    e.preventDefault();
    
    setErrors(validate(values));
    setIsSubmitting(true);
   
    
    UserActions.uniqueValid({username: values.email, isAdmin: values.isAdmin}).then(response => {
      console.log(response.data.message);
    }).catch((e) => {if(e.response.status === 401) {
      console.log(e);
      window.alert("This username already exists. Please try another one")
    } else {
      console.log(e);
      window.alert("Can not sign up")
    }
   });


  };

  
  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();

        UserActions.createCustomerAccount({username: values.email, password: values.password}).then(response => {
          console.log(response.data.message);
        }).catch((e) => {if(e.response.status === 401) {
          console.log(e);
          window.alert("This username already exists. Please try another one")
        } else {
          console.log(e);
          window.alert("Can not sign up")
        }
       })


      }
    },
    // eslint-disable-next-line
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;