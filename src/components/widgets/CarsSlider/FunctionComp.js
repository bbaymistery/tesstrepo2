import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CarItem from "./CarItem";
const itemsCarWrapperRef = React.createRef(null); //in order to click right or left and change lsider
const sliderRef = React.createRef(null); //total all sliders length (width)
const sliderConRef = React.createRef(null);
const CarsSlider = () => {
  //yani container olan hansiki ekranda gorsenen
  const [state, setState] = useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
    steps: 2,
    selectedStep: 1,
    visibleItems: sliderConRef?.current?.clientWidth / 400,
  });
  // create mouse listeners and close
  useEffect(() => {
    getPoint();

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", () => {
      getPoint();
    });
    return () => {
      window.removeEventListener("resize", getPoint);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  // click to left arrow
  let scrollDirection = (direction) => {
    const el = itemsCarWrapperRef.current;
    let { selectedStep, steps } = state;
    if (direction === "right") {
      selectedStep--;
      if (selectedStep < 1) {
        selectedStep = 1;
      }
    } else {
      selectedStep++;
      if (selectedStep > steps) {
        selectedStep = steps;
      }
    }
    el.scrollTo({
      left:
        el.scrollLeft +
        (direction == "right" ? -400 : 400) * state.visibleItems,
      behavior: "smooth",
    });
    setState({ ...state, selectedStep });
  };
  let onMouseMove = (e) => {
    if (
      itemsCarWrapperRef &&
      itemsCarWrapperRef.current &&
      !itemsCarWrapperRef.current.contains(e.target)
    ) {
      return;
    }
    e.preventDefault();
    const { clientX, scrollX, isScrolling, selectedStep } = state;

    //changing => when 6 items visible and we have 6 dots

    if (isScrolling) {
      itemsCarWrapperRef.current.scrollLeft = scrollX + e.clientX - clientX;

      let sX = scrollX + e.clientX - clientX;
      let cX = e.clientX;
      setState({
        ...state,
        scrollX: sX,
        clientX: cX,
      });
    }
  };
  let onMouseUp = (e) => {
    if (
      itemsCarWrapperRef &&
      itemsCarWrapperRef.current &&
      !itemsCarWrapperRef.current.contains(e.target)
    ) {
      return;
    }
    e.preventDefault();
    // itemsCarWrapperRef.current.style.cursor = "auto";

    setState({ ...state, isScrolling: false });
  };
  let onMouseDown = (e) => {
    if (
      itemsCarWrapperRef &&
      itemsCarWrapperRef.current &&
      !itemsCarWrapperRef.current.contains(e.target)
    ) {
      return;
    }
    e.preventDefault();
    // itemsCarWrapperRef.current.style.cursor = "grabbing";
    setState({ ...state, isScrolling: true, clientX: e.clientX });
  };
  let getPoint = () => {
    try {
      let silderConWidth = sliderConRef?.current?.clientWidth;
      let items = 3; //yani containerdeki pix leri bolur itemslain saayina ve alina  deger 2 ve ya 3 containerde gorunen olur
      //eger cotnainerWidth 960dan buyukse 400 bolucez cunki bir kartn genisliyi +margin400px
      if (sliderConRef?.current?.clientWidth > 1200) {
        items = Math.floor(silderConWidth / 400);
      } else if (sliderConRef?.current?.clientWidth < 1200) {
        items = Math.floor(silderConWidth / 320); //290+30
      } else if (sliderConRef?.current?.clientWidth < 992) {
        items = Math.ceil(silderConWidth / 350);
      } else if (sliderConRef?.current?.clientWidth < 768) {
        items = Math.floor(silderConWidth / 540);
      }

      let silderWidth = sliderRef?.current?.clientWidth;
      let steps = Math.floor(silderWidth / (400 * items)) + 1;
      if (steps > 6) {
        steps = 6;
      }

      setState({ ...state, visibleItems: items, steps: steps });
    } catch (error) {
    }
  };
  let changeSlideWithNavigationButton = (i) => {
    let left = state.visibleItems * 400 * i;
    //responsivness whenever card image width and container change
    if (sliderConRef?.current?.clientWidth < 960) {
      left = state.visibleItems * 360 * i;
    }
    if (sliderConRef?.current?.clientWidth < 720) {
      left = state.visibleItems * 540 * i;
    }
    if (sliderConRef?.current?.clientWidth < 540) {
      left = state.visibleItems * 360 * i;
    }
    if (sliderConRef?.current?.clientWidth < 500) {
      left = state.visibleItems * 420 * i;
    }

    if (sliderConRef?.current?.clientWidth < 390) {
      left = state.visibleItems * 370 * i;
    }
    if (sliderConRef?.current?.clientWidth < 361) {
      left = state.visibleItems * 360 * i;
    }
    document.getElementById("slider").scrollTo({
      left: left,
      behavior: "smooth",
    });

    //set active blue dot
    setState({ ...state, selectedStep: i + 1 });
  };
  useEffect(() => {
    return () => {
      //your cleanup code codes here
      try {
        window.removeEventListener("mousedown");
        window.removeEventListener("mouseup");
        window.removeEventListener("mousemove");
        window.removeEventListener("resize", getPoint);
      } catch (error) {
      }
    };
  }, []);

  return (
    <div className={styles.car_section}>
      <div className={styles.car_container} ref={sliderConRef}>
        <div className={styles.header}>
          <h2 className={styles.header_title}>Our Fleet </h2>
        </div>
        <div className={styles.body}>
          <div className={styles.body_content}>
            {/* ///bu scroll olunan oludugu ucun bunu alirix saga sola firradiriq */}
            <div
              className={styles.content_car_wrap}
              ref={itemsCarWrapperRef}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              id="slider"
            >
              <CarItem sliderRef={sliderRef} />
            </div>
            {/* !navigations When we click to change slider  */}
            <div className={styles.content_nav}>
              <div
                className={styles.owl_prev}
                onClick={(e) => scrollDirection("right")}
              >
                <i className={`fa-solid fa-angle-left ${styles.prev_icon}`}></i>
              </div>
              <div
                className={styles.owl_next}
                onClick={(e) => scrollDirection("left")}
              >
                <i
                  className={`fa-solid fa-angle-right ${styles.next_icon}`}
                ></i>
              </div>
            </div>
            <div className={styles.content_dots}>
              {Array.from(new Array(state.steps)).map((x, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => changeSlideWithNavigationButton(i)}
                    className={`${styles.dot} ${state.selectedStep === i + 1 ? styles.dotActive : ""
                      }`}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsSlider;
