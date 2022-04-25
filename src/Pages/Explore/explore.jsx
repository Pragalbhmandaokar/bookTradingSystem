import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./explore.css";
import Cards from "../../components/Body/Cards/Cards";
import News from "../../components/Header/header-news/news";
import Header from "../../components/Header/Header/Header";
import Footer from "../footer/footer";

import { useSelector } from "react-redux";

function Explore() {
  const userDetails = useSelector((state) => state.user);
  const [toggleState, setToggleState] = useState(false);
  const [dbCheck, GetDbCheck] = useState([]);
  const [refresh, getReferesh] = useState(false);

  useEffect(() => {
    let userId = null;
    if (userDetails.user != null) {
      if (Object.keys(userDetails.user).length > 0) {
        userId = userDetails.user.userId;
      }
    }
    Axios.get(`http://localhost:4000/product/${userId}`).then((Response) => {
      async function getData() {
        console.log(Response.data.message);
        GetDbCheck(Response.data.message);
      }
      getData();
    });
  }, []);

  {
    if (dbCheck.length > 0) {
      return (
        <div className="App">
          <Header
            toggleState={toggleState}
            setToggleState={setToggleState}
          ></Header>
          <News></News>

          <div className="container mt-10">
            {/* Book description in here */}
            <div className="panelHeader">
              <h2>Discover book you need</h2>
              <div className="content">
                <p>
                  Paragraphs are the building blocks of papers. Many students
                  define paragraphs in terms of length: a paragraph is a group
                  of at least five sentences, a paragraph is half a page long,
                  etc. In reality, though, the unity and coherence of ideas
                  among sentences is what constitutes a paragraph. A paragraph
                  is defined as “a group of sentences or a single sentence that
                  forms a unit” (Lunsford and Connors 116). Length and
                  appearance do not determine whether a section in a paper is a
                  paragraph. For instance, in some styles of writing,
                  particularly journalistic styles, a paragraph can be just one
                  sentence long. Ultimately, a paragraph is a sentence or group
                  of sentences that support one main idea. In this handout, we
                  will refer to this as the “controlling idea,” because it
                  controls what happens in the rest of the paragraph.
                </p>
              </div>
            </div>
            {/* Tried something different login style in below division In future case to modify */}
            <div className="MainPanelContainer">
            
            </div>
            <div className="cardHolder">
              {/* <Cards PageBehaviour={true} setToggleState={setToggleState} username={"Pragalbh"}></Cards> */}
              {dbCheck.map((val,index) => {
                return (
                  <Cards
                    getReferesh={getReferesh}
                    key={index}
                    PageBehaviour={true}
                    setToggleState={setToggleState}
                    username={val.booksName}
                    bookCoverLink={val.links}
                    collectionId={val.collectionId}
                    bookId={val.id}
                  ></Cards>
                );
              })}
            </div>
            <div className="newsAndInterView">
              <div className="news">
                <h5>news and interesting</h5>
                <div className="annoncement">
                  <p>Connect with the world in different way</p>
                </div>
                <div className="author">
                  <p>Are you author or publisher?</p>
                </div>
              </div>
            </div>
          </div>
          {/* <UploadItem/> */}
          <div className="Footer">
            <Footer></Footer>
          </div>
        </div>
      );
    } else {
      return (
        //Showing that website is in development and showing main page of website
        <div className="App">
          <div className="container">
            <h1>Nothing on this page</h1>
            <h2>Database not connected</h2>
          </div>
          <div className="Footer">
            <Footer></Footer>
          </div>
        </div>
      );
    }
  }
}

export default Explore;
