import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import validateinfo from './validateInfo'


export default function SigninScreen(props) {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const redirect = props.location.search
                     ? props.location.search.split('=')[1]
                    : '/';

                  

    
    const submitHandler = (e) => {
       e.preventDefault();
       
  };

  
    
    return(
       
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1> Sign In</h1>
                </div>
                <div>
                    <label htmlFor="email">Email address</label> 
                    <input 
                       type ="email" 
                       id="email" 
                       placeholder="Enter your Email"
                        required
                       onChange={(e) => setEmail(e.target.value)}>
                       </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label> 
                    <input 
                       type ="password" 
                       id="password" 
                       placeholder="Enter Password"
                        required
                       onChange={(e) => setPassword(e.target.value)}>
                       </input>
                </div>
                <div> 
                    <label />
                    <button className ="primary" type="submit">
                        Sign in
                    </button>
                </div>
                <div>
                    <label/>
                    <div>
                        New customer? {' '}
                        <Link to="/register"> Create your account</Link>
                        </div>
                </div>
            </form>
        </div>
     
    );
}