import React from 'react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuLinks: [
        {
          id: 0,
          name: 'Movies',
          link: '/movies'
        },
        {
          id: 1,
          name: 'Tv shows',
          link: '/tv-shows'
        },
        {
          id: 2,
          name: 'Search',
          link: '/search'
        }
      ]
    }
  }

  render() {
    return (
      <ul className="navigation">
        {this.state.menuLinks.map((linkItem) => <li key={linkItem.id}><a href={linkItem.link}>{linkItem.name}</a></li>)}
      </ul>
    )
  }
}

export default Navigation;