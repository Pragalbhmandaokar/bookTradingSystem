import React, { Component } from 'react'
import Login from './login/login';
import Signup from './Signup/signup';

export class Authentication extends Component {
    render() {
        return (
            <div className="Authentication">
                <Login></Login>
                <Signup></Signup>
            </div>
        )
    }
}

export default Authentication
