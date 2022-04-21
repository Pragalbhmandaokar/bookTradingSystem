import React from 'react'
import './footer.css'
export default function footer() {
    return (
        <div className="FooterContainer">
           
            <ul className="FooterList">
                <h5>Company</h5>
                <li><a>About us</a></li>
                <li><a>Term</a></li>
                <li><a>Privacy</a></li>
                <li><a>Ad Preference</a></li>
            </ul>
        
            <ul className="FooterList">
                <h5>Work with us</h5>
                <li><a>Author</a></li>
                <li><a>Advertise</a></li>
                <li><a>Blog Request</a></li>
                {/* <li><a>Api</a></li> */}
            </ul>
          
            <ul className="FooterList Connect">
                <h5>Connect</h5>
                <li><a>About us</a></li>
                <li><a>Term</a></li>
                <li><a>Privacy</a></li>
                <li><a>Ad Preference</a></li>
            </ul>
            <ul className="FooterList Connect">
                <h4>App launching soon</h4>
            </ul>
        </div>
    )
}
