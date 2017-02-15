import React from 'react'
import Helmet from "react-helmet"
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import ReadNext from '../ReadNext'
import './style.css'
import '../../static/css/highlight.css'
import ReactDisqusThread from 'react-disqus-thread'

class SitePost extends React.Component {
    render() {
        const { route } = this.props
        const post = route.page.data

        const project = config.GitHubRepository
        const username = config.GitHubUserName

        const edit_url = "https://github.com/" + username + "/" + project + "/edit/master/pages/articles/" + post.editpath + "/index.md"
        const history_url = "https://github.com/" + username + "/" + project + "/commits/master/pages/articles/" + post.editpath + "/index.md"

        const URL = config.GitHubBaseURL + prefixLink(this.props.location.pathname)

        const home = (
            <div>
              <Helmet
                  meta={[
                      // {property: "og:type", content: "blog"},
                      // {property: "og:url", content: URL},
                      // {property: "og:description", content: post.description},
                      // {property: "og:title", content: post.title},
                      // {property: "og:image", content: "http://www.military-history.org/wp-content/uploads/2014/04/Wittgenstein.jpg"}
                      ]}
                  link={[
                      {rel: "canonical", href: URL}
                  ]}
                  script={[
                      {src: "https://hypothes.is/embed.js", type: "text/javascript", async:true},
                      {type: "application/json", text: "{\"showHighlights\": true}", className:"js-hypothesis-config"}
                  ]}
              />

              <div className="button-container">
                <div className="button-box">
                  <Link className='gohome' to={ prefixLink('/') }>All Articles</Link>
                </div>
                <div className="button-box">
                  <Link className='gohome' to={ edit_url }>Edit this article</Link>
                </div>
                <div className="button-box">
                  <Link className='gohome' to={ history_url }>View edit history</Link>
                </div>
              </div>
          </div>
        )

        const disqus = ( <ReactDisqusThread 
            shortname = { config.disqusShortname }
            // identifier= { component.state.identifier }
            // title= {component.state.title}
            // url= { component.state.url }
            // category_id= {component.state.category_id }
            ></ReactDisqusThread>
        )

        return (
            <div>
              { home }
              <div className='blog-single'>
                <div className='text'>
                  <h1>{ post.title }</h1>
                  <div dangerouslySetInnerHTML={ { __html: post.body} } />
                  <div className='date-published'>
                    <em>Published { moment(post.date).format('D MMM YYYY') }</em>
                  </div>
                </div>
                <div className='footer'>
                  <ReadNext post={ post } {...this.props}/>
                  <hr></hr>
                  <p>
                    { config.siteDescr }
                    <a href={ config.siteTwitterUrl }>
                      <br></br> <strong>{ config.siteAuthor }</strong> on Twitter</a>
                  </p>
                  { disqus }
                </div>
                
              </div>
            </div>
        );
    }
}

SitePost.propTypes = {
    post: React.PropTypes.object.isRequired,
    pages: React.PropTypes.array,
}

export default SitePost
