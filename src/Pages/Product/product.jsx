import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
import cover from '../../components/Body/Cards/download.jpg';
import './product.css';
export default function Product(props) {
    const [xchange, setxchange] = useState(false)
    function openPanel (){
        setxchange(!xchange)
    }
    // const {handle} = useParams();
     const { state } = props.location.state;
     var styleUpdate = state["id"]
    return (
        <div className="productContainer">
            <div className="ProductImage">
                <div className="imageHolder">
                    <img src={cover}></img>
                </div>  
            </div>
            <div className="ProductInformation">
                <div className="ProductTitle">
                    <h4>Name of product</h4>
                    <p>Author</p>
                    <p>{styleUpdate}</p>
                    <div className="qualityOfProduct">
                        <h5>Quality percent</h5>
                    </div>
                    <div className="requestxChange">
                        <p>Price</p>
                        <p>$2</p>
                    </div>
                    <div className="Avaliable">

                    </div>
                </div>
                <div className="Aboutproduct">
                    <p>Qualcomm Snapdragon 768G 5G processor, 7nm chip and octa-core processor.
                    55W FlashCharge can charge the 4400mAh battery up to 50% in just 19 minutes* and a full charge in just 50 minutes*
                    64MP AF Main Camera with f/1.79 Aperture supported by GW3 sensor loaded with professional features like 4K videos @ 60FPS, EFB Autofocus Tracking and more. The device also comes with a 16MP Front Camera
                    120Hz Refresh Rate | 180Hz Touch Sampling Rate
                    Five-layer liquid cooling system can reduce the core temperature by 10 degrees</p>
                </div>
                <div className="CompareProduct">
                    <p>Compare product</p>
                </div>
            </div>
            <div className="orderpanel">
                <div className="shareOptions">
                    <p>s</p>
                </div>
                <div className="ProductRequest">
                    <div className={xchange ? "exchange active": 'exchange '}>
                        <button onClick={openPanel}>exchange</button>
                    </div>
                    <div className="offerMoney">
                        <p>Offer money</p>
                    </div>
                </div>   
                <div className="advertisement">
                        
                </div>
            </div>
            <div className="commentSection"></div>
        </div>
    )
}
