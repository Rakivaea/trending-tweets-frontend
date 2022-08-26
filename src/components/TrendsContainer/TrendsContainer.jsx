import { getFlagEmoji, numberWithCommas } from "../../utils/utils";
import { useEffect, useState } from "react";
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
  if (Object.keys(props.twitterData).length === 0) {
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
        <div className="trends-container">
          <header>
            <h1>Twitter Trends</h1>
            <div
              className="icon-in-container"
              onClick={() => setShowPanel((prevState) => !prevState)}
              title="Hide trends list"
            >
              <AiFillEyeInvisible />
            </div>
          </header>
          <div className="trends--location">
            <div className="trends--location-title">
              <h2 title={countryCode} className="flag-icon">
                {countryFlag}
              </h2>
              <h3>{locationName} Trends</h3>
            </div>
            {props.isLoading && (
              <SpinningCircles height={"2em"} width={"2em"} speed={"1.1"} />
            )}
          </div>
          <div className="trends--list-container">
            <ul className="trends--list">{trendsList}</ul>
          </div>
          <footer>
            <div className="footer--about"></div>
            <div className="footer--author">
              <p>Made using </p>
              <AiOutlineTwitter size="1.25em" className="twitter-icon" />
              <p>Twitter API</p>
            </div>
          </footer>
        </div>
      ) : (
        <div
          className="icon-no-container"
          title="Show trends list"
          onClick={() => setShowPanel((prevState) => !prevState)}
        >
          <AiFillEye />
        </div>
      )}
    </>
  );
}
