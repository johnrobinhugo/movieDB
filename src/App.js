import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/molecules/Header";
import FrontPage from "./components/pages/FrontPage";
import SinglePage from "./components/pages/SinglePage";
import ArchivePage from "./components/pages/ArchivePage";
import SearchPage from "./components/pages/SearchPage";
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";
import Footer from "./components/molecules/Footer";

import "./scss/main.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/movies/:id"
            element={<SinglePage mediaType="movie" />}
          />
          <Route
            path="/movies"
            element={
              <ArchivePage mediaType="movie" archiveTitle="All movies" />
            }
          />
          <Route
            path="/tv-shows/:id"
            element={<SinglePage mediaType="tv-show" />}
          />
          <Route
            path="/tv-shows"
            element={
              <ArchivePage mediaType="tv-show" archiveTitle="All tv-shows" />
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<FrontPage />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
