/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import "./style.scss"

import {Head, Header, Footer} from "components"
import {Page} from 'types'

const Layout = ({ metadata, page, children, ...props } : {metadata?: any, page: Page, children:any}) => {

  return (
    <div style={styles.container} {...props}>
      <Header page={page} />
      <Head metadata={metadata} page={page} />
      <div
        style={styles.main}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  container:{
    minHeight: '100%',
    maxWidth: '100%'
  },
  main: {
    margin: `0 auto`,
    maxWidth: 1950,
    padding: 20,
    overflow: 'hidden'
  }
}

export default Layout
