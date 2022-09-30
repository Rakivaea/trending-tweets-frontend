import { getFlagEmoji, isEmpty, numberWithCommas } from "../../utils/utils";
import { useState } from "react";
import { SpinningCircles } from "react-loading-icons";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineTwitter,
} from "react-icons/ai";
import "./TrendsContainer.css";
import { nanoid } from "nanoid";

export default function TrendsContainer(props) {
  const [showPanel, setShowPanel] = useState(true);
  let countryName;
  let countryFlag;
  let countryCode;
  let locationName;
  let trendsList;

  if (isEmpty(props.twitterData)) {
  } else {
    countryName = props.twitterData.nearMe[0].country;
    countryCode = props.twitterData.nearMe[0].countryCode;
    countryFlag = getFlagEmoji(countryCode);
    locationName = props.twitterData.nearMe[0].name;
    trendsList = props.twitterData.trends[0].trends;
    trendsList = trendsList.map((trend) => {
      let trendName = trend.name;
      let trendVolume = trend.tweet_volume;
      let trendUrl = trend.url;
      return (
        <li className="trends--list--item" key={nanoid()}>
          <a href={trendUrl} target="_blank" rel="noreferrer noopener">
            <h3 className="item--heading">{trendName}</h3>
            <p className="item--tweets">
              {numberWithCommas(Number(trendVolume))} tweet
              {Number(trendVolume) > 1 ? "s" : ""}
            </p>
          </a>
        </li>
      );
    });
  }

  return (
    <>
      {showPanel ? (
        <div
          className={
            props.isMobile ? "trends-container--mobile" : "trends-container"
          }
        >
          <header>
            <h1>Twitter Trends</h1>
            <div
              className={
                props.isMobile
                  ? "icon-in-container--mobile"
                  : "icon-in-container"
              }
              onClick={() => setShowPanel((prevState) => !prevState)}
              title="Hide trends list"
            >
              <AiFillEyeInvisible size={props.isMobile ? "1.75em" : "1em"} />
            </div>
          </header>
          <div className="trends--location">
            <div className="trends--location-title">
              <h2 title={countryName} className="flag-icon">
                {countryFlag}
              </h2>
              <h3>
                {props.firstLoad
                  ? "Loading Trends..."
                  : `${locationName} Trends`}
              </h3>
            </div>
            {props.isLoading && (
              <SpinningCircles height={"2em"} width={"2em"} speed={"1.1"} />
            )}
          </div>
          <div className="trends--list-container">
            <ul className="trends--list">{trendsList}</ul>
          </div>
          <footer>
            <div className="footer--about">
              <details>
                <summary title="Show 'About' section">About</summary> Press on
                any location on the map and get the current trending Twitter
                topics around that area.
              </details>
            </div>
            <div className="footer--author">
              <div className="footer--author-twitter">
                <p>Made using </p>
                <AiOutlineTwitter size="1.1em" className="twitter-icon" />
                <p>Twitter API</p>
              </div>
              <div className="footer--author-name">
                <p>Rakivaea Kvitting</p>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <div
          className="icon-no-container"
          title="Show trends list"
          onClick={() => setShowPanel((prevState) => !prevState)}
        >
          <AiFillEye size={props.isMobile ? "1.75em" : "1em"} />
        </div>
      )}
    </>
  );
}
