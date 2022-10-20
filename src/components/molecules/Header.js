import React from 'react';

import Navigation from './Navigation';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMobileNav: false,
      loggedInstatus: null
    }

    this.toggleMobileNav = this.toggleMobileNav.bind(this);
  }

  toggleMobileNav(e) {
    e.preventDefault();
    this.setState(prevState => ({
      showMobileNav: !prevState.showMobileNav
    }));
  }

  render() {

    let toggleButton;

    if(this.state.showMobileNav === false) {
      toggleButton = <button type="button" className="toggle-menu" onClick={this.toggleMobileNav} />
    } else {
      toggleButton = <button type="button" className="toggle-menu--open" onClick={this.toggleMobileNav} />
    }

    return (
      <header className="header">
        <div className="header__content page-wrapper">
          <a href="/" className="site-logo">The Movie DB {this.props.IsLoggedIn}</a>
          <div className="header__content__links">
            <Navigation />
            <a href="/login" className="button">Log in</a>
            <a href="/create-account">Create account</a>
          </div>
          {toggleButton}
        </div>
        {this.state.showMobileNav === true &&
          <div className="header__small-menu page-wrapper">
            <Navigation />
            <a href="/login" className="button">Log in</a>
            <a href="/create-account">Create account</a>
          </div>
        }
      </header>
    )
  }
}

export default Header;