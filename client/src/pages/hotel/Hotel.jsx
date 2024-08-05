import React, { useContext, useState } from "react";
import "./hotel.css";
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MailList } from "../../components/mailList/MailList";
import { Footer } from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Reserve } from "../../components/reserve/Reserve";

export const Hotel = () => {

 const location = useLocation();
 const id = location.pathname.split("/")[2];
 const [slideNumber,setSlideNumber] = useState(0)
 const [open,setOpen] = useState(false)
 const [openModel,setOpenModel] = useState(false)

 const { data, loading, error } = useFetch(`/hotels/find/${id}`);
 const { user } = useContext(AuthContext);
 const navigate = useNavigate()
 const {dates,options} = useContext(SearchContext);

 const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
 function dayDifference(date1,date2){
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
  return diffDays;
 } 

 const days = dayDifference(dates[0].endDate,dates[0].startDate)
  const photos = [
    {
      src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1505692433770-36f19f51681d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const handleOpen = (i)=>{
  setSlideNumber(i)
  setOpen(true)
  }

  const handleMove = (direction) =>{
    let newSliderNumber;

    if(direction==="l"){
      newSliderNumber = slideNumber === 0 ? 5 : slideNumber-1;
    }else{
      newSliderNumber = slideNumber === 5 ? 0 : slideNumber+1;
    }
    setSlideNumber(newSliderNumber)
  }

  const handleClick = () =>{
    if(user){
      setOpenModel(true)
    }
    else{
      navigate("/login")
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? "loading" : <> <div className="hotelContainer">
      {open && <div className="slider">
       <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
       <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
       <div className="sliderWrapper">
        <img src={data.photos[slideNumber]} alt="" className="sliderImg"/>
       </div>
       <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")}/>
      </div>}
        <div className="hotelWrapper">
        <button className="bookNow">Reserve or Book Now !</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data.distance} from Gate way of India
          </span>
          <span className="hotelPriceHightlight">
            Book a stay over ${data.cheapestPrice}  at this property and get a free airport taxi
          </span>

          <div className="hotelImages">
            {data.photos?.map((photo,i) => (
              <div className="hotelImgWrapper">
                <img onClick={()=>handleOpen(i)} src={photos} alt="" className="hotelImg"/>
              </div>
            ))}
          </div>

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
              {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for {days}-night stay</h1>
              <span>
              Taj transforms your trip abroad into a fantastic getaway
              with luxury, comfort, and attentive service.
              </span>
              <h2>
                <b>${days * data.cheapestPrice * options.room}</b> ({days}night)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now</button>
            </div>
          </div>
        </div>
        <MailList/>
      <Footer/>
      </div></>}
      {openModel && <Reserve setOpen={setOpenModel} hotelId={id}/>}
    </div>
  );
};
