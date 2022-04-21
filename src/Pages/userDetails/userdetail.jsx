import React,{useState ,useEffect} from 'react'
import './userdetail.css'
import Header from '../../components/Header/Header/Header'
import image from '../../Assets/User.jpg'

export default function userdetail(){
    return (<div class="body-conatiner">
        <Header/> 
        <div class="grid-container">
        <div class="left-grid">
            <div class="user-profile">
                <img src={image} alt="Profile Picture" class="banner"/>
            </div>
            <h5>My Profile</h5>
            <div class="user-details">
                <div id="username">
                    <p><b>Username:</b>This is my username</p>
                </div>
                <div id="email">
                    <p><b>Email:</b>This is my email</p>
                </div>
                <div id="member-since">
                    <p><b>Member Since:</b>From the very day this site came into existance</p>
                </div>
                <div calss="user-bio">
                    <p><b>My Bio:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis cum quo impedit reiciendis unde est consectetur fuga, saepe omnis reprehenderit. Eum unde placeat numquam ad ipsum qui omnis harum explicabo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ipsa sapiente dolorum quae sed sint!</p>
                </div>
            </div>
        </div>
        
        <div class="right-grid">
            <div class="right-upper-grid">
                <h5>My Reads</h5>
                <div class="read">
                    <p><b>My Current Reads:</b></p>
                </div>
                <div class="read">
                <p><b>My Previous Reads:</b></p> 
                </div>
            </div>
            <div class="right-lower-grid">
                <h5>My Saved Quotes</h5>
                <p>Quote1</p>
                <p>Quote1</p>
                <p>Quote1</p>
                <p>Quote1</p>
            </div>
        </div>
    </div>
    </div>)
}