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
          <div className="bg-slate-400 w-[8vw] py-2 h-26 rounded-lg">
            <div className="w-full h-full px-2">
              <div className="bg-white ">
                <img src={bookCoverLink}></img>
              </div>
              <div className="w-full h-full">
                <div className="prose prose-stone">In Offer</div>
                {/* <h4  >{username}</h4>
                       <h4>Product name</h4> */}
                <button
                  className="bg-white w-full hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow"
                  onClick={() => onButtonClick(true)}
                >
                  Trade
                </button>
              </div>
            </div>
          </div>
        );
        }
    }


export default Cards
