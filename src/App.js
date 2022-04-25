import "./App.css";
import React, { Component } from "react";
import Login from "./Pages/Authentication/login/login";
import Signup from "./Pages/Authentication/Signup/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Redirect } from "react-router";
import Explore from "./Pages/Explore/explore";
import Error from "./Pages/Error/error404";
import Profile from "./Pages/Profile/Profile";
import Product from "./Pages/Product/product";
class App extends Component {
  //const location = useLocation();

  render() {
    return (
      <div className="Body-container">
        <div className="header"></div>
    
        <div className="Brandname_header">
          <Router>
            <Routes>
              <Route exact path="/" element={<Explore />} />
              <Route exact path="/trade" element={<Explore/>} />
              <Route path="/Error404" element={<Error />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product" element={<Product />} />
            
            </Routes>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
