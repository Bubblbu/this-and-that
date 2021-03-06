import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import SiteNav from '../SiteNav'
import SiteLinks from '../SiteLinks'
import './style.css'
import profilePic from '../../pages/author.jpg'
import ccbyPic from '../../pages/ccby.png'

class SiteSidebar extends React.Component {
    render() {
        const {location, children} = this.props
        const isHome = location.pathname === prefixLink('/')

        let header = (
        <header>
          {/* <Link style={ {    textDecoration: 'none',    borderBottom: 'none',    outline: 'none'} } to={ prefixLink('/') }>
            <img className='profile-pic' src={profilePic} width='75' height='75' />
          </Link> */}
          
          <h1>
            <Link style={ {    textDecoration: 'none',    borderBottom: 'none',    color: 'inherit'} } to={ prefixLink('/') }> { config.siteTitle }
            </Link>
          </h1>

          <h2>
            <Link style={ {    textDecoration: 'none',    borderBottom: 'none',    color: 'inherit'} } to={ prefixLink('/') }> by { config.siteAuthor }
            </Link>
          </h2>

          <p>
            { config.siteDescr }
          </p>
        </header>
        )

        return (
            <div className='sidebar'>
              <div className='sidebar-inner'>
                <div className='blog-details'>
                  <header>
                    { header }
                  </header>
                </div>
                <div className='blog-options'>
                  <SiteNav {...this.props}/>
                  <footer>
                    <SiteLinks {...this.props}/>
                    <p className='copyright'>
                      <br/>
                      <img href="https://creativecommons.org/licenses/by/4.0/" src={ccbyPic} alt="copyright"/>
                      This work is licensed under a <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
                    </p>
                  </footer>
                </div>
              </div>
            </div>
            );
    }
}

SiteSidebar.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
}

export default SiteSidebar