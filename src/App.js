import "./App.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMap from "./components/GoogleMap/GoogleMap";
import Marker from "./components/Marker/Marker";
import TrendsContainer from "./components/TrendsContainer/TrendsContainer";
import { useState, useEffect, useCallback } from "react";
import { isEmpty } from "./utils/utils";
import { useMediaQuery } from "react-responsive";

function App() {
  const API_URLS = {
    trends: "http://localhost:3000/twitter/trends/",
    nearMe: "http://localhost:3000/twitter/nearMe/",
    trendsNearMe: "http://localhost:3000/twitter/trendsNearMe/",
  };
  const render = (status) => {
    return <h1>{status}</h1>;
  };
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const [twitterData, setTwitterData] = useState({});
  const [currentCoords, setCurrentCoords] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const fetchTwitterTrends = useCallback(async () => {
    try {
      console.log(
        `current coords lat: ${currentCoords.lat} long: ${currentCoords.lng}`
      );

      const query_params = "?" + new URLSearchParams(currentCoords);
      setIsLoading(true);
      const response = await fetch(API_URLS.trendsNearMe + query_params);
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const trends = await response.json();
      setTwitterData(trends);
      setIsLoading(false);
      console.log(trends);
      return trends;
    } catch (e) {
      console.log(e);
    }
  }, [currentCoords]);

  // Load twitter trends on initialization of webpage, or when coords change
  useEffect(() => {
    console.log(currentCoords);
    fetchTwitterTrends();
  }, [fetchTwitterTrends, currentCoords]);

  // console.log(currentCoords);
  // console.log(twitterData);
  return (
    <div className="App">
      <div className="layer1">
        <Wrapper
          apiKey={"AIzaSyDaTyi2j1M6E34nLGRYU7Mj6skKF_WC7Gs"}
          render={render}
        >
          <GoogleMap
            zoom={zoom}
            center={center}
            setCurrentCoords={setCurrentCoords}
            isMobile={isMobile}
          >
            {currentCoords.lng !== 0 && currentCoords.lat !== 0 && (
              <Marker position={currentCoords} />
            )}
          </GoogleMap>
        </Wrapper>
      </div>
      <div className="layer2">
        {isEmpty(twitterData) ? (
          <></>
        ) : (
          <TrendsContainer
            isLoading={isLoading}
            isMobile={isMobile}
            twitterData={twitterData}
          />
        )}
      </div>
    </div>
  );
}

export default App;
