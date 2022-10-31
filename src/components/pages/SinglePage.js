import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

import Hero from "../molecules/Hero";
import Like from "../atoms/Like";

//import { connect } from "react-redux";
//import { addLike, removeLike } from "../../store/actions";

function SinglePage(props) {
  const [mediaObject, setMediaObject] = useState({})
  const [baseImgUrl, setBaseImgUrl] = useState([])
  const [backdropSizes, setBackdropSizes] = useState([])
  const likeStatus = useState(false)

  let pageId = useParams()

  useEffect(() => {
    const apiKey = "629509ed105e3999068ed4c71c959130";
     // Get API configs like images sizes
     fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
     .then((response) => response.json())
     .then((data) => {
        setBaseImgUrl(data.images.base_url)
        setBackdropSizes( data.images.backdrop_sizes)
     })
     .catch((error) => {
       console.log(error);
     });

   // Really ugly solution for getting the id from the route
   // What I in reality should use is useParams() https://reactrouter.com/en/main/hooks/use-params
   // However, to use this I would need to rebuild the component since I cant use that function inside of a class component
   //const str = window.location.href;
   //const lastIndex = str.lastIndexOf("/");
   //const pageId = str.substring(lastIndex + 1);

    let mediaType = "";

    if (props.mediaType === "movie") {
      mediaType = "movie";
    } else if (props.mediaType === "tv-show") {
      mediaType = "tv";
    }

   fetch(
     `https://api.themoviedb.org/3/${mediaType}/${pageId.id}?api_key=${apiKey}`
   )
     .then((response) => response.json())
     .then((data) => {
       setMediaObject(data)

       //let likesFromStore = this.props.likes;

      /*
       for (let i = 0; i < likesFromStore.length; i++) {
         if (likesFromStore[i].id === this.state.mediaObject.id) {
           this.setState({
             likeStatus: true,
           });
         }
       }
      */
     })
     .catch((error) => {
       console.log(error);
     });
  })

  const backdropSize = backdropSizes[3];
  const backdropPath = mediaObject.backdrop_path;
  const bgImageUrl = baseImgUrl.concat(backdropSize, backdropPath);

  let heroTitle = null;

  if (mediaObject.original_title !== undefined) {
    heroTitle = mediaObject.original_title;
  } else {
    heroTitle = mediaObject.original_name;
  }

  return (
    <main className="page">
      <Hero title={heroTitle} bgImgUrl={bgImageUrl} />
      <div className="bg-white">
        <div className="page-wrapper">
          <div className="primary-content">
            <div className="primary-content__column">
              <p>{mediaObject.overview}</p>
            </div>
            <div className="primary-content__column">
              <div className="meta-info">
                <p className="meto-info__item">
                  <span>Release date: </span>
                  {mediaObject.release_date}
                </p>
                <p className="meto-info__item">
                  <span>Average vote: </span>
                  {mediaObject.vote_average}
                </p>
              </div>
              <p className="like-this">
                <span>Heart this:</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SinglePage