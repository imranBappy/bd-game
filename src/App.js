import React from 'react';
import {
  HashRouter, Route, Switch
} from "react-router-dom";
import './App.css';
import Layout, { Dashboard, Home, NotFound, PrivateRoute, SignIn, Signup } from './Components/Layout/Layout';
const App = () => {

  return (
    <>
      <HashRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={Signup} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </HashRouter>
    </>
  );
};

export default App;