import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {login} from "../../../redux/userSlice";
import Axios from 'axios';
import './login.css';
import {useNavigate} from "react-router-dom";
function Login(){
  const [username,SetUsername] = useState("");
  const [password,SetPassword] = useState("");
  const [errorHandling,setErrorHandling] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) =>{
    e.preventDefault();
  }
  const LogindbFunction= ()=>{
    Axios.post('http://localhost:4000/login',{
        username: username,
        password: password,
      }).then((Response)=>{
        if (Response.data.message == "Invalid email address : user not found" || Response.data.message == "Incorrect password"){
          setErrorHandling(Response.data.message);
        }else{
          localStorage.setItem("userId", Response.data.userDetail.userid);
          localStorage.setItem("email",Response.data.userDetail.name);
         
           dispatch(
             login({
               userId: Response.data.userDetail.userid,
               name: username,
               loggedIn: true,
             })
           );
          
          navigate("/");
        }
      })
    };
        return (
          <div className="loginContainer">
            <div className="nameHolder">
              <p>
                <a href="/">ConnectPage</a>
              </p>
            </div>
            <div className="xChange-login">
              <div className="AuthButtons">
                <p>Login to ConnectPage</p>

                <button>Continue with Google</button>
              </div>
              <div className="formContainer">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <p>Email address</p>
                  <input
                    className="xChange-Login__Username"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                      SetUsername(e.target.value);
                    }}
                  />
                  <p>Password</p>
                  <input
                    placeholder="password"
                    type="password"
                    tabindex="1"
                    onChange={(e) => {
                      SetPassword(e.target.value);
                    }}
                    required
                    autofocus
                  />
                  <div className="Capacha"></div>
                  <div className="SubmitContainer">
                    <button onClick={LogindbFunction}>Login</button>
                    <span>Forget password?</span>
                    <p>{errorHandling}</p>
                  </div>

                  <div className="formFooter">
                    <p>
                      not a member? <a href="/signup">Sign up</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
    
}

export default Login
