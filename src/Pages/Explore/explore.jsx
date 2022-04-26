import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./explore.css";
import Cards from "../../components/Body/Cards/Cards";
import News from "../../components/Header/header-news/news";
import Header from "../../components/Header/Header/Header";
import Footer from "../footer/footer";
import { login } from "../../redux/userSlice";
import { useSelector,useDispatch } from "react-redux";

function Explore() {
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user,getUser] = useState([]);
  const [toggleState, setToggleState] = useState(false);
  const [dbCheck, GetDbCheck] = useState([]);
  const [refreshExplore, getExploreReferesh] = useState(false);

  useEffect(() => {
    const userid = localStorage.getItem("userId");
    if (userDetails == null) {
      Axios.get("http://localhost:4000/getUserdetailsByID/" + userid).then(
        (response) => {
          const getState = () => {
            console.log("userid :", userid);
            dispatch(
              login({
                userId: response.message.id,
                name: response.message.username,
                loggedIn: true,
              })
            );
          };
          getState();
        }
      );
    }
    let userId = null;
    if (userDetails.user != null) {
      if (Object.keys(userDetails.user).length > 0) {
        userId = userDetails.user.userId;
      }
    }
    Axios.get(`http://localhost:4000/product/${userId}`).then((Response) => {
      async function getData() {
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
          <News userDetails={userDetails}> </News>

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
            <div className="MainPanelContainer"></div>
            <div className="cardHolder">
              {/* <Cards PageBehaviour={true} setToggleState={setToggleState} username={"Pragalbh"}></Cards> */}
              {dbCheck.map((val, index) => {
                return (
                  <Cards
                    getExploreReferesh={getExploreReferesh}
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
            <div className="newsAndInterView bg-gray-800 text-white">
              <div className="bg-gray-800">
                <div>news and interesting</div>
                <div class="bg-gray-800 ">
                  <div class="max-w-screen-xl mx-2 pt-2 pb-4">
                    <div class="flex flex-wrap md:flex-col md:-mx-2">
                      <div class="w-full mb-4 lg:mb-4">
                        <a
                          href="#"
                          class="h-10 md:h-48 block group relative mx-2 overflow-hidden shadow-lg"
                        >
                          <img
                            src="https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=384&q=80"
                            class="absolute z-0 object-cover w-full h-72 md:h-96 transform group-hover:scale-150"
                          />
                          <div class="absolute gradient transition duration-300 group-hover:bg-black group-hover:opacity-90 w-full h-72 md:h-96"></div>
                          <div class="absolute left-0 right-0 bottom-0 p-6 transform translate-y-1/2 transition duration-300 h-full group-hover:translate-y-0 delay-100">
                            <div class="h-1/2 mt-4 relative">
                              <div class="absolute bottom-0">
                                <h2 class="font-bold text-white leading-tight transition duration-300 text-xl pb-6 group-hover:underline">
                                  New book is avaliable to swap
                                </h2>
                              </div>
                            </div>
                            <div class="h-2/2">
                              <button class="bg-white text-black text-sm px-3 py-1 font-semibold opacity-0 transition duration-300 group-hover:opacity-100 border-2 border-white focus:border-black focus:bg-gray-300">
                                Place
                              </button>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
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
