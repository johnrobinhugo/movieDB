import React from 'react';

import ContentSection from '../organisms/ContentSection';
import ContentGrid from '../organisms/ContentGrid';
import Pagination from '../molecules/Pagination';

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: [],
      backdropSizes: [],
      posterSizes: [],
      mediaList: [],
      pageNumber: 1,
      isFirstPage: true
    }

    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleGoForward = this.handleGoForward.bind(this);
    this.getMediaItems = this.getMediaItems.bind(this);
  }

  componentDidMount() {
    const apiKey = '629509ed105e3999068ed4c71c959130';

    // Get API configs like images sizes
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          baseUrl: data.images.base_url,
          backdropSizes: data.images.backdrop_sizes,
          posterSizes: data.images.poster_sizes
        });
      })
      .catch((error) => {
        console.log(error);
      });

      this.getMediaItems();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.pageNumber !== this.state.pageNumber) {
      this.getMediaItems();
    }
  }

  getMediaItems() {
    let mediaType = '';

    if(this.props.mediaType === 'movie') {
      mediaType = 'movie';
    } else if(this.props.mediaType === 'tv-show') {
      mediaType = 'tv';
    }

    const apiKey = '629509ed105e3999068ed4c71c959130';

    // Get movies
    fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=en-US&popularity.asc&include_adult=false&include_video=false&page=${this.state.pageNumber}`)
      .then(response => response.json())
      .then(data => {
        let mediaObjects = data.results;
        this.setState({
          mediaList: mediaObjects
        })
      })
      .catch((error) => {
        console.log(error);
      });; 
  }

  handleGoBack() {
    if(this.state.pageNumber !== 1) {
      this.setState({
        pageNumber: this.state.pageNumber - 1
      });
    }
  }

  handleGoForward() {
    this.setState({
      pageNumber: this.state.pageNumber + 1,
      isFirstPage: false
    });
  }

  render() {
    let mediaTypeUrl = '';

    if(this.props.mediaType === 'movie') {
      mediaTypeUrl = 'movies';
    } else if(this.props.mediaType === 'tv-show') {
      mediaTypeUrl = 'tv-shows';
    }

    return (
      <main className="page">
        <ContentSection title={this.props.archiveTitle}>
          <ContentGrid content={this.state.mediaList} contentBaseUrl={mediaTypeUrl} configBaseUrl={this.state.baseUrl} configPosterSizes={this.state.posterSizes} />
        </ContentSection>
        <Pagination goBack={this.handleGoBack} goForward={this.handleGoForward} disableBackButton={this.state.isFirstPage} />
      </main>
    )
  }
}

export default ArchivePage;