/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import "./layout.css"
import 'semantic-ui-css/semantic.min.css'

class Layout extends React.Component {
    render() {
        //         const data = useStaticQuery(graphql`
        //     query SiteTitleQuery {
        //       site {
        //         siteMetadata {
        //           title
        //         }
        //       }
        //     }
        //   `)

        return (
            <>
                <Header siteTitle={"Torrentz2"} />
                <div
                    className='mobile-padding'
                >
                    <main>{this.props.children}</main>
                    
                    <footer >
                       
                        <span style={{ float: "right" }}>
                       
                            {/* <span style={{ display: "inline" }}> */}
                            <a href="/privacy" target="_blank" >Privacy Policy</a>  © {new Date().getFullYear()}, Built with {` `}
                                <a href="https://www.torrentz2.link">Torrentz</a>
                            {/* </span> */}
                        </span>
                    </footer>
                </div>
            </>
        )
    }


}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
