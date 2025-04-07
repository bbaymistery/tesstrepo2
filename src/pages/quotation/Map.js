import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import { GoogleMap, Polyline, OverlayView as OverlayViewComponent, useLoadScript } from "@react-google-maps/api";

const OverlayView = (props) => {
  return (
    <OverlayViewComponent mapPaneName={OverlayViewComponent.OVERLAY_MOUSE_TARGET} getPixelPositionOffset={(w, h) => ({ x: -(w / 2), y: -(h / 2) })} position={props.position}  >
      {props.children}
    </OverlayViewComponent>
  );
};
/**
 * @props { rightLabel = "left", label, index, color, position }
 */
const MarkerWithLabel = (props) => {
  let { rightLabel = false, label, index, color, position, isTaxiDeal,env } = props;

  return (
    <>
      <OverlayView position={position}>
        <div className={styles["google-maps-markerwithlabel"]}>
          {!isTaxiDeal ? <p d={rightLabel ? "right" : "left"}>{label}</p> : <></>}
          {/* <p d={rightLabel ? "right" : "left"}>{label}</p> */}
          <span>{index}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${env.apiDomain}/media/i/google-map-marker/${color || "fff-287dfa"}`} style={{ fontSize: '10px', width: '60px' }} alt={"marker"} />
        </div>
      </OverlayView>
    </>
  );
};
const Map = ({ datas, selectedPickPoints, selectedDroppOfPoints, isTaxiDeal = false ,env}) => {
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: process.env.mapApiKey })
  const [points, setPoints] = useState([]);

  const letters = ["A", "B", "C", "D", "E"];

  const containerStyle = { width: "100%", minHeight: `230px`, borderRadius: "5px", };
  const containerStyle2 = { minWidth: "100%", minHeight: `100%`, borderRadius: "5px", };

  let polyOptions = datas?.polylinePath?.map((poly) => { return { lat: poly[0], lng: poly[1] }; });

  let pathOptions = datas?.markerPoints?.map((poly) => { return { lat: poly[0], lng: poly[1] }; });

  const options = {
    strokeColor: "red",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "black",
    fillOpacity: 0.35,
    clickable: false,
    draggable: true,
    editable: false,
    visible: true,
    radius: 30000,
    paths: polyOptions,
    fullscreenControl: false,
    zIndex: 1,

  };


  const googleMapOptions = {

    fullscreenControl: false,
  }
  const onLoad = (infoWindow) => {
  };
  useEffect(() => {
    if (!isTaxiDeal) {
      setPoints([...selectedPickPoints, ...selectedDroppOfPoints]);
    }

  }, [selectedPickPoints, selectedDroppOfPoints, isTaxiDeal]);



  return (
    //AIzaSyDj4vvK0JOc18G40y4QUrrVcaMJzkV1jH4
    <div className={styles.google_map}>
      {!isLoaded ?
        <div>...</div>
        :
        !isTaxiDeal ?
          datas?.markerPoints && selectedPickPoints.length > 0 && selectedDroppOfPoints.length > 0 &&
          <GoogleMap mapContainerStyle={containerStyle} className={styles.map_container} center={{ lat: datas?.markerPoints[0][0], lng: datas?.markerPoints[0][1], }} zoom={7} >
            <>
              <Polyline onLoad={onLoad} path={polyOptions} options={options} />
              {selectedDroppOfPoints.length > 0 && selectedPickPoints.length > 0 &&
                pathOptions?.map((coord, index) =>
                  <MarkerWithLabel
                    color="fff-18449e"
                    env={env}
                    key={index}
                    position={coord}
                    index={letters[index]}
                    label={index % 2 === 0 ? points[index]?.address : points[index]?.address}
                  />)}
            </>
          </GoogleMap>
          : datas?.markerPoints &&
          <GoogleMap options={options} mapContainerStyle={containerStyle2} className={styles.map_container} center={{ lat: datas?.markerPoints[0][0], lng: datas?.markerPoints[0][1] }} zoom={6} >
            <Polyline onLoad={onLoad} path={polyOptions} options={options} />
            {pathOptions?.map((coord, index) =>
              <MarkerWithLabel
                color="fff-13357B"
                key={index}
                env={env}
                position={coord}
                isTaxiDeal={isTaxiDeal}
                index={letters[index]}
              />)}
          </GoogleMap>
      }
    </div>
  );
};

export default Map;
