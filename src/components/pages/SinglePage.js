import React from "react";

import Hero from "../molecules/Hero";
import Like from "../atoms/Like";

import { connect } from "react-redux";
import { addLike, removeLike } from "../../store/actions";

class SinglePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaObject: {},
      baseUrl: [],
      backdropSizes: [],
      likeStatus: false,
    };

    this.setLikeStatus = this.setLikeStatus.bind(this);
  }

  componentDidMount() {
    const apiKey = "629509ed105e3999068ed4c71c959130";

    // Get API configs like images sizes
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          baseUrl: data.images.base_url,
          backdropSizes: data.images.backdrop_sizes,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // Really ugly solution for getting the id from the route
    // What should
    const str = window.location.href;
    const lastIndex = str.lastIndexOf("/");
    const pageId = str.substring(lastIndex + 1);

    let mediaType = "";

    if (this.props.mediaType === "movie") {
      mediaType = "movie";
    } else if (this.props.mediaType === "tv-show") {
      mediaType = "tv";
    }

    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${pageId}?api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          mediaObject: data,
        });

        let likesFromStore = this.props.likes;

        console.log(likesFromStore);

        for (let i = 0; i < likesFromStore.length; i++) {
          if (likesFromStore[i].id === this.state.mediaObject.id) {
            this.setState({
              likeStatus: true,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setLikeStatus(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      likeStatus: !prevState.likeStatus,
    }));

    if (this.state.likeStatus === false) {
      this.props.addLike({ id: this.state.mediaObject.id });
    } else {
      this.props.removeLike({ id: this.state.mediaObject.id });
    }
  }

  render() {
    const baseUrl = this.state.baseUrl;
    const backdropSize = this.state.backdropSizes[3];
    const backdropPath = this.state.mediaObject.backdrop_path;
    const bgImageUrl = baseUrl.concat(backdropSize, backdropPath);

    let heroTitle = null;

    if (this.state.mediaObject.original_title !== undefined) {
      heroTitle = this.state.mediaObject.original_title;
    } else {
      heroTitle = this.state.mediaObject.original_name;
    }

    return (
      <main className="page">
        <Hero title={heroTitle} bgImgUrl={bgImageUrl} />
        <div className="bg-white">
          <div className="page-wrapper">
            <div className="primary-content">
              <div className="primary-content__column">
                <p>{this.state.mediaObject.overview}</p>
              </div>
              <div className="primary-content__column">
                <div className="meta-info">
                  <p className="meto-info__item">
                    <span>Release date: </span>
                    {this.state.mediaObject.release_date}
                  </p>
                  <p className="meto-info__item">
                    <span>Average vote: </span>
                    {this.state.mediaObject.vote_average}
                  </p>
                </div>
                <p className="like-this">
                  <span>Heart this:</span>
                  <Like
                    sendLikeStatus={this.setLikeStatus}
                    likeStatus={this.state.likeStatus}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addLike: (id) => dispatch(addLike(id)),
  removeLike: (id) => dispatch(removeLike(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePage);
