import React from 'react';

import { Link } from "react-router-dom";

function Notice(props) {
  return (
    <section className="notice">
      <div className="notice__content color-white">
        <h2>{props.title}</h2>
        <Link to={props.link} className="button">{props.linkTitle}</Link>
      </div>
    </section>
  )
}

export default Notice;