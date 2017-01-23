import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

import '../static/css/reset.css'
import '../static/css/base.css'
import '../static/css/typography.css'

class Template extends React.Component {
    render() {
        const {location, children} = this.props

        return (
            <div className='wrapper'>
              { children }
            </div>
            );
    }

    componentDidMount() {
        function loadScript() {
             var script= document.createElement('script');
             script.type= 'text/javascript';
             script.src= 'https://hypothes.is/embed.js';
             script.async = true;
             document.body.appendChild(script);
        }
        loadScript();
    }
}

Template.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
    route: React.PropTypes.object,
}

export default Template