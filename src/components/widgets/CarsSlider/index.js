import React, { useState, useEffect, useRef } from "react";
import { carsItems } from "../../../constants/carss"; // Importing the car items array
import styles from "./styles.module.scss"; // Importing styles
import Image from "next/image";
import { useSelector } from "react-redux";

const CarsSlider = (props) => {
  let { bggray } = props
  const { appData } = useSelector(state => state.initialReducer)
  const state = useSelector(state => state.pickUpDropOffActions)
  let { params: { direction, } } = state
  const sliderRef = useRef(null); // Reference for the slider DOM element
  const [visibleItems, setVisibleItems] = useState(3); // Number of visible items in the slider
  const [currentIndex, setCurrentIndex] = useState(visibleItems); // Current index of the slider (start with first visible set)
  const [isTransitioning, setIsTransitioning] = useState(false); // Boolean to control smooth transitions

  // Adjust the number of visible items based on the screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 480) {
        setVisibleItems(1); // Show 1 item for small screens
      } else if (window.innerWidth < 768) {
        setVisibleItems(2); // Show 2 items for medium screens
      } else {
        setVisibleItems(3); // Default to 3 items for larger screens
      }
    };
    updateVisibleItems(); // Run on component mount
    window.addEventListener("resize", updateVisibleItems); // Update on screen resize
    return () => window.removeEventListener("resize", updateVisibleItems); // Cleanup on unmount
  }, []);

  // Duplicate the first and last few items to enable infinite scrolling
  const items = [
    ...carsItems.slice(-visibleItems), // Add last few items at the beginning
    ...carsItems,
    ...carsItems.slice(0, visibleItems), // Add first few items at the end
  ];

  const totalItems = items.length; // Total number of items including duplicates

  // Handle transition end to reset the slider position for infinite scrolling
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex <= 0) {
      // If the current index is less than or equal to 0, reset to the last real items
      setCurrentIndex(carsItems.length);
    } else if (currentIndex >= carsItems.length + visibleItems) {
      // If the current index exceeds the total items, reset to the first real items
      setCurrentIndex(visibleItems);
    }
  };

  // Move to the next or previous set of items
  const handleNavigation = (direction) => {
    if (isTransitioning) return; // Prevent navigation during a transition
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + direction * visibleItems); // Move by the number of visible items
  };

  // Dragging functionality
  const [startX, setStartX] = useState(0); // Store the initial mouse position
  const [dragging, setDragging] = useState(false); // Boolean to track dragging state

  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.pageX); // Store the mouse position on drag start
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const xDifference = e.pageX - startX; // Calculate how far the mouse has moved
    if (xDifference > 50) {
      handleNavigation(-1); // If moved to the right, navigate backward
      setDragging(false); // End dragging
    } else if (xDifference < -50) {
      handleNavigation(1); // If moved to the left, navigate forward
      setDragging(false); // End dragging
    }
  };

  const handleMouseUp = () => setDragging(false); // Stop dragging on mouse release

  // Calculate the number of dots for pagination
  const totalDots = Math.ceil(carsItems.length / visibleItems);

  // Update the slider index when clicking on a dot
  const handleDotClick = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index * visibleItems + visibleItems); // Navigate to the corresponding items
  };

  return (
    <div className={styles.car_section} bggray={String(bggray)}>
      <h2 className={styles.header_title}>{appData.words["strOurFleet"]} </h2>
      <div className={styles.car_section_container}>
        <div className={styles.sliderContainer}>
          {/* Left Arrow  //! Move left on click */}
          <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={() => handleNavigation(-1)}  >
            ◀
          </button>

          {/* Slider */}
          {/* Start dragging ,Handle dragging movement ,Stop dragging ,Stop dragging when mouse leaves the area*/}
          <div className={styles.sliderWrapper} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} >
            {/* Transform=>// Move slider based on currentIndex  &&  Reset position after transition onTransitionEnd*/}
            <div className={styles.slider} ref={sliderRef} style={{ transform: `translateX(-${(100 / visibleItems) * currentIndex}%)`, transition: isTransitioning ? "transform 0.5s ease" : "none", }} onTransitionEnd={handleTransitionEnd}     >
              {items.map((item, index) => (
                // Adjust item width based on visible items
                <div key={index} className={styles.sliderItem} style={{ flex: `0 0 ${100 / visibleItems}%` }}   >
                  <div className={styles.card}>
                    {/* Using Next.js Image */}
                    <div className={styles.imageWrapper}>
                      <Image
                        src={item.carImage} // The source URL of the image
                        alt={item.carName} // Alt text for accessibility
                        fill// Use "fill" to fill the parent container
                        style={{ objectFit: "contain" }} // Maintain aspect ratio and cover the space
                        className={styles.cardImage} // Class for styling
                      />
                    </div>

                    <div className={styles.card_body}>
                      <h3 className={`${direction} ${styles.card_body_title}`}>{item.carName}</h3>
                      <div className={styles.card_body_attributes}>
                        <ul className={styles.card_atr_ul} direction={String(direction === "rtl")}>
                          <li className={styles.card_atr_li}>
                            <i className={`fa-solid fa-users ${styles.li_icon}`}></i>
                            <span className={styles.li_desc}>
                              {`${appData?.words?.["strNoofPassengers"] || "Passengers"} ${item.passenger}`}
                            </span>
                          </li>
                        </ul>
                        <ul className={styles.card_atr_ul} direction={String(direction === "rtl")}>
                          <li className={`${styles.card_atr_li} ${styles.card_atr_li_suitcase}`}>
                            <i className={`fa-solid fa-suitcase ${styles.li_icon}`}></i>
                            <span className={`${styles.li_desc}`}>
                              {`${appData?.words?.["strNoofSuitcases"] || "Suitcases"} ${item.suitcase}`}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow  //! Move right on click */}
          <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={() => handleNavigation(1)}  >  ▶ </button>

          {/* Pagination Dots */}
          <div className={styles.dots}>
            {/* Navigate to items on dot click */}
            {Array.from({ length: totalDots }).map((_, index) => (
              <div key={index} className={`${styles.dot} ${index === Math.floor((currentIndex - visibleItems) / visibleItems) ? styles.activeDot : ""}`} onClick={() => handleDotClick(index)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsSlider;
