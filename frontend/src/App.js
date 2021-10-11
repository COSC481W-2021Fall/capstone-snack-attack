import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SigninScreen from './screen/SigninScreen';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';



function App() {

  
  
  return (
    <BrowserRouter>
    <div className ="grid-container">
  <header className="row">
    <div>
      <Link className="brand" to="/">Cross Amazon</Link>
    </div>
    <div>
      <Link to="/cart">Cart</Link>
      
          <Link to="/signin">Sign In</Link>

          <Link to="/admin">Admin</Link>
      
        
    </div>
        
  </header>
  <main>
  <Route path ="/" component={HomeScreen} exact></Route>
    <Route path ="/product/:id" component={ProductScreen}></Route>
    <Route path ="/signin" component={SigninScreen}></Route>
  
    
  </main>
  
    
  <footer className="row center">All right reserved</footer>
</div>

</BrowserRouter>
  );
}

export default App;