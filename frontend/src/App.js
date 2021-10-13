import React from "react";
import { Switch, Route, Link, BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//import Login from "./";

import UploadProductPage from "./components/uploadProduct";
//import UploadProductPage from "./components/uploadProductsComponents";

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
        </BrowserRouter>      </div>
    </div>
  );
}

export default App;

    