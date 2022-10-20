import React from 'react';

import { Link } from "react-router-dom";

function ContentSection(props) {
  return (
    <section className="content-section page-wrapper">
      <div className="content-section__head">
        {props.title != null &&
          <h2 className="content-section__title color-white">{props.title}</h2>
        }
        {props.sectionLink != null &&
          <Link to={props.sectionLink} className="arrow-link arrow-link--white">{props.sectionLinkTitle}</Link>
        }
      </div>
      {props.children}
    </section>
  )
}

export default ContentSection;