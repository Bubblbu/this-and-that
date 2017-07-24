import React from 'react'
import Helmet from "react-helmet"
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import ReadNext from '../ReadNext'
import SiteSidebar from '../SiteSidebar'
import './style.css'
import ReactDisqusThread from 'react-disqus-thread'

class SitePost extends React.Component {
    render() {
        const { route } = this.props
        const post = route.page.data

        const project = config.GitHubRepository
        const username = config.GitHubUserName

        const edit_url = "https://github.com/" + username + "/" + project + "/edit/master/pages/" + route.page.file.path
        const history_url = "https://github.com/" + username + "/" + project + "/commits/master/pages/" + route.page.file.path

        const URL = config.GitHubBaseURL + prefixLink(this.props.location.pathname)

        const edit_bar = (
            <div className="edit-bar">
              <div className="btn-group">
                   <a href={ edit_url } className="btn btn-secondary btn-sm" role="button">Edit this article</a>
                   <a href={ history_url } className="btn btn-secondary btn-sm" role="button">View edit history</a>
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
              
              <SiteSidebar {...this.props}/>
              <div className='content'>
                <div className='main'>
                  <div className='main-inner'>
                    <div className='blog-single'>
                      { edit_bar }
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
