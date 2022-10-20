import React from 'react';

import { Link } from "react-router-dom";

function Hero(props) {

  const showLargeHero = props.showLargeHero;

  return (
    <section className={`hero ${showLargeHero ? "hero--large" : ""}`} style={{backgroundImage: "url(" + props.bgImgUrl + ")"}}>
      <div className="page-wrapper">
        <div className="hero__content color-white">
          <h1>{props.title}</h1>
          {props.body !== undefined &&
            <p>{props.body}</p>
          }
          {props.link !== undefined &&
            <Link to={props.link} className="button button--hollow">{props.linkTitle}</Link>
          }
        </div>
      </div>
    </section>
  )
}

export default Hero;