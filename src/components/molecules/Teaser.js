import React from "react";

import { Link } from "react-router-dom";

function Teaser(props) {
  return (
    <Link to={`${props.baseUrl}/${props.id}`} className="teaser">
      <img src={props.imgUrl} alt={props.title} />
      <div className="teaser__content">
        <h4>{props.title}</h4>
        <span className="arrow-link">View</span>
      </div>
    </Link>
  );
}

export default Teaser;
