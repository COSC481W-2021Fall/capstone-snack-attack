import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

import AdminSignupApp from './components/signup/admin/AdminSignupApp';
import AdminLoginApp from './components/login/AdminLoginApp';



function App() {


    return(
        <div>
            <header>
                <div>
                    <span>
                    <a href={"/adminlogin"}>Login</a>&nbsp;
                    </span>
                </div>


                <div>
                    <span>
                    <a href={"/adminsignup"}>Become a store manager</a>&nbsp;
                    </span>
                </div>

            </header>

            <main>

                <BrowserRouter>
                    <Switch>
                    <Route exact path={["/adminlogin"]}>
                        < AdminLoginApp />
                    </Route>

                    <Route exact path={["/adminsignup"]}>
                        < AdminSignupApp />
                    </Route>

                    </Switch>
                </BrowserRouter>

            </main>


        </div>

    );

}

export default App;