import React from "react";
import { Admin, Resource, EditGuesser } from "react-admin";
import { UserList } from './components/Users';
import restProvider from 'ra-data-simple-rest';
import { Switch, Route, Link, BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';
import SigninScreen from './screen/SigninScreen';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';

//import Login from "./";

import UploadProductPage from "./components/uploadProduct";
//import UploadProductPage from "./components/uploadProductsComponents"; 

const dataProvider = restProvider('http://localhost:3000')
function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }




  return (
    <div>
      <div className="container mt-3">
      <BrowserRouter>
          <Switch>
           <Route 
            path="/components/uploadProduct"
            render={(props) => (
              <UploadProductPage {...props} />
            )}
          />
          </Switch>
      </BrowserRouter> 
      <Admin dataProvider={dataProvider}>
        <Resource
         name="users"
          list={UserList}
          edit={EditGuesser} />
      </Admin>
      </div>
    </div>
  );
}

export default App;