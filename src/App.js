import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Layout, { SignIn, Home, NotFound, Signup, Dashboard, PrivateRoute } from './Components/Layout/Layout'
import './App.css'
const App = () => {

  return (
    <>
      <Router>
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
      </Router>
    </>
  );
};

export default App;