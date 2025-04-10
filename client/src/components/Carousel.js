import { useEffect } from "react";
import { useState } from "react";
import "../css/Carousel.css"; 


function Carousel( ) {
    const images = [
        {
          image: "https://res.cloudinary.com/dmr8qadjn/image/upload/v1744266138/car2_ksecmv.webp",
          title: "",
        },
        {
          image: "https://res.cloudinary.com/dmr8qadjn/image/upload/v1744265762/car1_vchoo9.webp",
          title: "",
        },
        {
          image: "https://res.cloudinary.com/dmr8qadjn/image/upload/v1744266139/car3_owqesg.webp",
          title: "",
        },
        {
          image: "https://res.cloudinary.com/dmr8qadjn/image/upload/v1744266139/car4_fnhhgh.webp",
          title: "",
        },
      ];
      
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;

  useEffect(() => {
    timeOut =
      autoPlay &&
      setTimeout(() => {
        slideRight();
      }, 4000);
  });

  const slideRight = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div
      className="carousel shadow-[2px_-2px_10px_0px_#c084fc]"
      onMouseEnter={() => {
        setAutoPlay(false);
        clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <div className="carousel_wrapper">
        {images.map((image, index) => {
          return (
            /* (condition) ? true : false */

            <div
              key={index}
              className={
                index == current
                  ? "carousel_card carousel_card-active"
                  : "carousel_card"
              }
            >
              <img className="card_image" src={image.image} alt="" />
              <div className="card_overlay">
                <h2 className="card_title font-raleway">{image.title}</h2>
              </div>
            </div>
          );
        })}
        <div className="carousel_arrow_left" onClick={slideLeft}>
          &lsaquo;
        </div>
        <div className="carousel_arrow_right" onClick={slideRight}>
          &rsaquo;
        </div>
        <div className="carousel_pagination">
          {images.map((_, index) => {
            return (
              <div
                key={index}
                className={
                  index == current
                    ? "pagination_dot pagination_dot-active"
                    : "pagination_dot"
                }
                onClick={() => setCurrent(index)}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Carousel;

