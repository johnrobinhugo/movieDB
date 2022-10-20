import React from 'react';

import ContentSection from '../organisms/ContentSection';
import ContentGrid from '../organisms/ContentGrid';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      value: '',
      movieResults: [],
      tvResults: [],
      baseUrl: [],
      backdropSizes: [],
      posterSizes: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({query: this.state.value});
    event.preventDefault();
  }

  handleSearch() {
    const apiKey = '629509ed105e3999068ed4c71c959130';

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.query}&page=1&include_adult=false`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          movieResults: data.results
        });
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${this.state.query}&page=1&include_adult=false`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          tvResults: data.results
        });
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      value: ''
    });
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
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.query !== this.state.query) {
      this.handleSearch();
    }
  }

  render() {

    return (
      <main className="page">
        <ContentSection title="Search for movies and tv shows">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form__item form__item--search">
              <input type="text" value={this.state.value} placeholder="Search by title" onChange={this.handleChange} />
              <button type="submit">Search</button>
            </div>
          </form>
          {this.state.query !== '' &&
            <p className="color-white search-result-title">Search results for: {this.state.query}</p>
          }
        </ContentSection>
        {this.state.movieResults.length > 0 && 
          <ContentSection title="Movies">
            <ContentGrid content={this.state.movieResults} contentBaseUrl="/movies" gridItems={10} configBaseUrl={this.state.baseUrl} configPosterSizes={this.state.posterSizes}/>
          </ContentSection>
        }
        {this.state.tvResults.length > 0 && 
          <ContentSection title="Tv shows">
            <ContentGrid content={this.state.tvResults} contentBaseUrl="/tv-shows" gridItems={10} configBaseUrl={this.state.baseUrl} configPosterSizes={this.state.posterSizes}/>
          </ContentSection>
        }
      </main>
    )
  }
}

export default SearchPage;