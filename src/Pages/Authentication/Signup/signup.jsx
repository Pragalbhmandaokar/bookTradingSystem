import React,{ useState } from 'react';
import Axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import './signup.css'
library.add(fab, faCheckSquare, faCoffee)

function Signup() {
  
  const [usernameReg,SetUsernameReg] = useState("");
  const [passwordReg,SetPasswordReg] = useState("");
      
      const register= ()=>{
        Axios.post('http://localhost:4000/registration',{
          email: usernameReg,
          password: passwordReg,
        }).then((Response)=>{
          console.log(Response.data);
        })
      }
      
        return (
           <div className="SignupContainer">
                 <div className="nameHolder">
              <p><a href="/">ConnectPage</a></p>
            </div>
            <div className="xChange-login">
              <div className="AuthButtons">
                <p>Join to ConnectPage</p>
                <button>Continue with Google</button>
              </div>
              <div className="formContainer">
                  <div className="form">
                      <p>Email address</p>
                        <input className="xChange-Login__Username"
                        type="text"
                        placeholder="Email"
                        onChange={(e) => {
                          SetUsernameReg(e.target.value);
                        }}
                        />
                        <p>Password</p>
                        <input placeholder="password"
                          type="password"
                          tabindex="1"
                          onChange={(e) => {
                            SetPasswordReg(e.target.value);
                        }}
                          required autofocus />
                      
                      <div className="Capacha"></div>
                      <div className="SubmitContainer">
                        <button onClick={register}>Sign up</button>
                        <span>Forget password?</span> 
                      </div>
                        
                      <div className="formFooter">
                          <p>Already a member? <a href="/login">Login</a></p>
                      </div>

                  </div>
                    
                  
              </div>
               
            </div>
           </div>
        )
}

export default Signup
