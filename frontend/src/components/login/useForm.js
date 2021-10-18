import { useState, useEffect } from 'react';
import UserActions from "../../services/userAction";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '', 
    userrole: ''
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
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();

        UserActions.verifyLogin({username: values.email, password: values.password, userrole: values.userrole}).then(response => {
          console.log(response.data);
        }).catch((e) => {if(e.response.status === 401) {
          console.log(e);
          window.alert("Invalid email or password")
        } else {
          console.log(e);
        //  window.alert("Can not sign up")
        }
       })


      }
    }, // eslint-disable-next-line 
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;