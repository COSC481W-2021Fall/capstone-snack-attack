import React from "react";
import { Admin, Resource, EditGuesser } from "react-admin";
import { UserList } from './components/Users';
import restProvider from 'ra-data-simple-rest';

const dataProvider = restProvider('http://localhost:3000')
function App() {
  return (
      <Admin dataProvider={dataProvider}>
        <Resource
         name="users"
          list={UserList}
          edit={EditGuesser} />
      </Admin>
    );
  }
export default App;
