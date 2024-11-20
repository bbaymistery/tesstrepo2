import React from "react";
import styles from "./styles.module.scss";
import CarItem from "./CarItem";
import { connect } from "react-redux";
const itemsCarWrapperRef = React.createRef(null); //in order to click right or left and change lsider
const sliderRef = React.createRef(null); //total all sliders length (width)
const sliderConRef = React.createRef(null);
class CarsSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolling: false,
      clientX: 0,
      scrollX: 0,
      steps: 2,
      selectedStep: 1,
      visibleItems: sliderConRef?.current?.clientWidth / 400,
    };
  }

  componentDidMount() {
    this.getPoint();
    window.addEventListener("resize", () => {
      this.getPoint();
    });
  }
  // click to left arrow
  scrollDirection(direction) {
    const el = itemsCarWrapperRef.current;
    let { selectedStep, steps } = this.state;
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
        (direction == "right" ? -400 : 400) * this.state.visibleItems,
      behavior: "smooth",
    });
    this.setState({ selectedStep });
  }
  onMouseMove(e) {
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
      this.setState({
        scrollX: sX,
        clientX: cX,
      });
    }
  }
  onMouseUp(e) {
    if (
      itemsCarWrapperRef &&
      itemsCarWrapperRef.current &&
      !itemsCarWrapperRef.current.contains(e.target)
    ) {
      return;
    }
    e.preventDefault();
    this.setState({ isScrolling: false });
  }
  onMouseDown(e) {
    if (
      itemsCarWrapperRef &&
      itemsCarWrapperRef.current &&
      !itemsCarWrapperRef.current.contains(e.target)
    ) {
      return;
    }
    e.preventDefault();
    // itemsCarWrapperRef.current.style.cursor = "grabbing";
    this.setState({ isScrolling: true, clientX: e.clientX });
  }
  getPoint() {
    let silderConWidth;
    if (sliderConRef?.current?.clientWidth) {
      silderConWidth = sliderConRef?.current?.clientWidth;
    }
    let items = 3;
    if (sliderConRef?.current?.clientWidth > 1200) {
      items = Math.floor(silderConWidth / 400);
    } else if (sliderConRef?.current?.clientWidth < 1200) {
      items = Math.floor(silderConWidth / 320); //290+30
    } else if (sliderConRef?.current?.clientWidth < 992) {
      items = Math.ceil(silderConWidth / 350);
    } else if (sliderConRef?.current?.clientWidth < 768) {
      items = Math.floor(silderConWidth / 540);
    }
    let silderWidth;
    if (sliderRef?.current?.clientWidth) {
      silderWidth = sliderRef?.current?.clientWidth;
    }
    let steps = Math.floor(silderWidth / (400 * items)) + 1;
    if (steps === 4) {
      steps = 3;
    }
    if (steps > 6) {
      steps = 6;
    }
    this.setState({ visibleItems: items, steps: steps });
  }
  changeSlideWithNavigationButton(i) {
    let left = this.state.visibleItems * 400 * i;
    //responsivness whenever card image width and container change
    if (sliderConRef?.current?.clientWidth < 960) {
      left = this.state.visibleItems * 360 * i;
    }
    if (sliderConRef?.current?.clientWidth < 720) {
      left = this.state.visibleItems * 540 * i;
    }
    if (sliderConRef?.current?.clientWidth < 540) {
      left = this.state.visibleItems * 360 * i;
    }
    if (sliderConRef?.current?.clientWidth < 500) {
      left = this.state.visibleItems * 425 * i;
    }

    if (sliderConRef?.current?.clientWidth < 415) {
      left = this.state.visibleItems * 430 * i;
    }

    if (sliderConRef?.current?.clientWidth < 391) {
      left = this.state.visibleItems * 370 * i;
    }
    if (sliderConRef?.current?.clientWidth < 361) {
      left = this.state.visibleItems * 360 * i;
    }
    document.getElementById("slider").scrollTo({
      left: left,
      behavior: "smooth",
    });

    //set active blue dot
    this.setState({ selectedStep: i + 1 });
  }
  componentWillUnmount() {
    this.getPoint();
    try {
      window.removeEventListener("mousedown");
      window.removeEventListener("mouseup");
      window.removeEventListener("mousemove");
      window.removeEventListener("resize", getPoint);
    } catch (error) { }
  }
  render() {
    const { bggray = false, noborder = false } = this.props;
    return (
      <div className={styles.car_section} bggray={String(bggray)} style={{ border: `${noborder ? "none" : "1px solid transparent"}` }} >
        <div className={styles.car_container} ref={sliderConRef}>
          <div className={styles.header}>
            <h1 className={styles.header_title}>{this.props.appData.words["strOurFleet"] || 'Our Fleet'}</h1>
          </div>
          <div className={styles.body}>
            <div className={styles.body_content}>
              {/* ///bu scroll olunan oludugu ucun bunu alirix saga sola firradiriq */}
              <div className={styles.content_car_wrap} ref={itemsCarWrapperRef} id="slider"   >
                <CarItem sliderRef={sliderRef} />
              </div>
              {/* !navigations When we click to change slider  */}
              <div className={styles.content_nav}>
                <div className={styles.owl_prev} onClick={(e) => this.scrollDirection("right")}     >
                  <i className={`fa-solid fa-angle-left ${styles.prev_icon}`}    ></i>
                </div>
                <div className={styles.owl_next} onClick={(e) => this.scrollDirection("left")}     >
                  <i className={`fa-solid fa-angle-right ${styles.next_icon}`}    ></i>
                </div>
              </div>
              <div className={styles.content_dots}>
                {this.state.steps &&
                  Array.from(new Array(this.state.steps)).map((x, i) => {
                    return (
                      <div key={i} onClick={() => this.changeSlideWithNavigationButton(i)} className={`${styles.dot} ${this.state.selectedStep === i + 1 ? styles.dotActive : ""}`}  ></div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// This function maps the Redux state to the component's props
const mapStateToProps = (state) => ({
  appData: state.initialReducer.appData,
});

// Connect the CarsSlider component to Redux using the connect function
export default connect(mapStateToProps)(CarsSlider);

CarsSlider.defaultProps = {
  bggray: false
};
