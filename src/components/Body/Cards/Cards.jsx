import React from 'react'
import './cards.css';
import { Link } from "react-router-dom";

function Cards({PageBehaviour,setToggleState,username,bookCoverLink,getTradeBookPrice}){
    const Explore = PageBehaviour;
    const onButtonClick=(mode)=>{
        setToggleState(mode);
    }
        
    if(Explore){
        return (
          <div className="cardContainer">
            <div className="cardInsider">
              <Link
                to={{
                  pathname: "/:product",
                  state: { id: 1, name: "Ford", color: "red" },
                }}
              >
                <div className="cardImage">
                  <img src={bookCoverLink}></img>
                </div>
              </Link>
              <div className="CardNameHolder">
                <h4>{username}</h4>

                <div className="CardButtonHolder h-full">
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold h-full border border-gray-400 rounded shadow"
                    onClick={() => onButtonClick(true)}
                  >
                    Trade
                  </button>
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow"
                    onClick={() => onButtonClick(true)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }else{
        return (
            <div className="cardContainer smallSize">
                <div className="cardInsider">
                    <div className="cardImage">
                            <img src={bookCoverLink}></img>
                    </div>
                    <div className="CardNameHolder">
                        <p>In Offer</p>
                       {/* <h4  >{username}</h4>
                       <h4>Product name</h4> */}
                       <button onClick={()=>onButtonClick(true)}>Trade</button>
                      
                    </div> 
                </div>
            </div>

    )
        }
    }


export default Cards
