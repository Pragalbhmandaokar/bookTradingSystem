import React, { Component } from 'react'
import './uploadItem.css'
function uploadItem() {

        return ( 
            <div className="Item-upload-body">
                <div className="Item-upload-Background"></div>
                <div className="Item-upload-container">
                   
                    {/* <div className="Item-upload-progress">
                            Progress so
                        </div> */}
                    <div className="Item-upload-form">
                    <div className="Item-upload-Picture">
                               <div className="item-picture">
                                    
                               </div>
                                <input type="file"></input>
                            </div>
                        <div className="upload-form">
                            <div className="formBody">
                               <input placeholder="Name of product"></input>
                               <input placeholder="InExchange"></input>
                               <input placeholder="Author"></input>
                                
                            <br>
                            </br>
                            <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}

export default uploadItem
