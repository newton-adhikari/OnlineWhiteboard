import React from "react";
import ColorPicker from "./Container/ColorPicker/ColorPicker";
import Login from "./Container/Login/Login";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token; // Check if a token exists
  
    // backend token data maybe availabel after a while
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };
  

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/whiteboard" component={ColorPicker} />
    </Router>
  );
}

export default App;