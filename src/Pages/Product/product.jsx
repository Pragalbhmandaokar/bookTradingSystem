import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import cover from '../../components/Body/Cards/download.jpg';
import './product.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Product() {
    const navigate = useNavigate();
    const params = useParams();
    const [bookDetail, getBookDetails] = useState([]);

    useEffect(()=>{
           const { productId } = params;
           axios.get(`http://localhost:4000/selectProductDetails/${productId}`).then((Response) => {
             getBookDetails(Response.data.message);
           });
    },[params]);

    const [xchange, setxchange] = useState(false);

    function openPanel (){
        setxchange(!xchange)
    }

    const initPayment = (data) => {
      const options = {
        key: "rzp_test_QrlgQtOf1Em7Tg",
        amount: data.amount,
        currency: data.currency,
        name: bookDetail.name,
        description: "Test Transaction",
        image: bookDetail.links,
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyUrl = "http://localhost:4000/api/payment/verify";
            const { data } = await axios.post(verifyUrl, response);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#000",
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:4000/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: 2 });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateBack = () =>{
    navigate(-1);
  }
    return (
      <>
        <div className="w-full h-12 flex justify-start items-center py-10 px-20 bg-black">
          <div
            className="py-4 px-10 border-2 rounded-lg bg-white"
            onClick={navigateBack}
          >
            BACK
          </div>
        </div>
        <div className="productContainer">
          <div className="ProductImage">
            <div className="imageHolder">
              <img src={bookDetail.links}></img>
            </div>
          </div>
          <div className="ProductInformation">
            <div className="ProductTitle">
              <h4>
                {bookDetail?.booksName ? bookDetail.booksName : "Name of pduct"}
              </h4>
              <p>{bookDetail?.Author ? bookDetail.Author : "Author"}</p>
              <p>{}</p>
              <div className="qualityOfProduct">
                <h5>Quality percent : </h5>
                <div className="h4-thin">60%</div>
              </div>
              <div className="flex">
                <div className="h6-thin py-8">Price : </div>
                <div className="h3-thin px-6">200</div>
              </div>
              <div className="Avaliable"></div>
            </div>
            <div className="Aboutproduct">
              <p>
                Qualcomm Snapdragon 768G 5G processor, 7nm chip and octa-core
                processor. 55W FlashCharge can charge the 4400mAh battery up to
                50% in just 19 minutes* and a full charge in just 50 minutes*
                64MP AF Main Camera with f/1.79 Aperture supported by GW3 sensor
                loaded with professional features like 4K videos @ 60FPS, EFB
                Autofocus Tracking and more. The device also comes with a 16MP
                Front Camera 120Hz Refresh Rate | 180Hz Touch Sampling Rate
                Five-layer liquid cooling system can reduce the core temperature
                by 10 degrees
              </p>
            </div>
            <div class="supaviews">
              <img
                class="supaviews__logo"
                src="https://app.supabase.io/img/supabase-logo.svg"
              />
              <div class="supaviews__gradient"></div>
              <div class="supaviews__add">
                <div class="supaview">
                  <h1 class="supaview__title">Add a new review</h1>
                  <form id="review">
                    <fieldset class="supaview__rating">
                      <input type="radio" id="star5" name="rate" value="5" />
                      <label for="star5"></label>
                      <input type="radio" id="star4" name="rate" value="4" />
                      <label for="star4"></label>
                      <input type="radio" id="star3" name="rate" value="3" />
                      <label for="star3"></label>
                      <input type="radio" id="star2" name="rate" value="2" />
                      <label for="star2"></label>
                      <input type="radio" id="star1" name="rate" value="1" />
                      <label for="star1"></label>
                    </fieldset>
                    <div class="supaview__copy">
                      <input type="text" name="name" placeholder="Name" />
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows="5"
                      ></textarea>
                    </div>
                    <button class="supaview__submit">Submit review</button>
                  </form>
                </div>
              </div>
              <div class="supaviews__list">
                <div class="supaview">Looks empty around here..</div>
              </div>
            </div>
          </div>
          <div className="orderpanel rounded-lg">
            <div className="shareOptions rounded-t-lg font-medium">
              <p>ways to trade</p>
            </div>
            <div className="ProductRequest">
              <div
                className={
                  xchange
                    ? "exchange active p-2 bg-slate-200"
                    : "exchange active bg-slate-200"
                }
              >
                <button onClick={openPanel} className="p-2 mt-2 font-medium">
                  exchange
                </button>
                <div className="pt-2 cursor-pointer">Trade</div>
              </div>
              <div className="offerMoney bg-zinc-600 rounded-b-lg py-10">
                <p className="font-medium">Offer money</p>
                <p>Amount:</p>
                <div>$20</div>
                <div className="pt-2 cursor-pointer" onClick={handlePayment}>
                  BUY
                </div>
              </div>
            </div>
            <div className="advertisement"></div>
          </div>
          <div className="commentSection"></div>
        </div>
      </>
    );
}
