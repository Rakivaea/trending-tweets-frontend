import "./GoogleMap.css";
import React, { useRef, useState, useEffect } from "react";

export default function GoogleMap(props) {
  const ref = useRef(null);
  const [map, setMap] = useState();
  const setCurrentCoords = (coords) => {
    props.setCurrentCoords(coords);
  };

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          zoomControl: !props.isMobile,
          zoom: props.zoom,
          center: props.center,
          fullscreenControl: false,
          streetViewControl: false,
          gestureHandling: "greedy",
        })
      );
    }

    if (map) {
      window.google.maps.event.clearListeners(map, "click");
      map.addListener("click", (mapsMouseEvent) => {
        setCurrentCoords(mapsMouseEvent.latLng.toJSON());
      });
    }
  }, [ref, map]);

  return (
    <>
      <div ref={ref} id="google-map" />
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
}
