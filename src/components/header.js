import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `steelblue`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        // maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>

      

      <ul style={{listStyle: 'none', float:'right' }}>
        <li style={{display: 'inline-block', marginRight: '1rem',}}>
          <Link style ={{color: 'white', textDecoration: 'none', }} to="/search/latest">Latest Torrent</Link>
          
        </li>
      </ul>

      <ul style={{listStyle: 'none', float:'right' }}>
        <li style={{display: 'inline-block', marginRight: '1rem',}}>
          <Link style ={{color: 'white', textDecoration: 'none', }} to="/search/top">Top Torrent</Link>
          
        </li>
      </ul>



    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `Torrentz2`,
}

export default Header
