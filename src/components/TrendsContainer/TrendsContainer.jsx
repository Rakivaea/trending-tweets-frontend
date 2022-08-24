import { numberWithCommas } from "../../utils/utils";
import { useEffect, useState } from "react";
import { SpinningCircles } from "react-loading-icons";
import { AiFillEyeInvisible } from "react-icons/ai";
import "./TrendsContainer.css";
import { nanoid } from "nanoid";

export default function TrendsContainer(props) {
  let countryName;
  let countryCode;
  let locationName;
  let trendsList;
  if (Object.keys(props.twitterData).length === 0) {
  } else {
    countryName = props.twitterData.nearMe[0].country;
    countryCode = props.twitterData.nearMe[0].countryCode;
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
    <div className="trends-container">
      <div className="trends--navigation">
        <h3 className="trends--title">Twitter Trends</h3>
        <div className="icon">
          <AiFillEyeInvisible />
        </div>
      </div>
      <div className="trends--location">
        <h3>{locationName} Trends</h3>
        {props.isLoading && (
          <SpinningCircles height={"2em"} width={"2em"} speed={"1.1"} />
        )}
      </div>
      <div className="trends--list-container">
        <ul className="trends--list">{trendsList}</ul>
      </div>
      <div className="trends--footer">
        <p>Made using Twitter API</p>
      </div>
    </div>
  );
}
