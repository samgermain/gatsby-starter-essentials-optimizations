import React from "react"
import {useStaticQuery, graphql} from 'gatsby'
import {MyImageProps, NavLink, NavBarProps} from 'interfaces'

import Nav, { ScrollNav } from 'components/Navi'

const Header = ({page}) => {

  const navBarProps: NavBarProps = useStaticQuery(graphql`
    query NavBarQuery {
      dataJson {
        navLinks {
          text,
          link
        }
        scrollLinks {
          text,
          link
        }
      }
      logo: file(name: {eq: "web-dexter-logo"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `)

  const logoImageProps: MyImageProps = {
    "imgProps": navBarProps.logo.childImageSharp.fluid,
    "alt": "Web Dexter Logo",
    "title": "Web Dexter Logo"
  }

  const links: [NavLink] = navBarProps.dataJson.navLinks
  const scrollLinks: [NavLink] = navBarProps.dataJson.scrollLinks

  return(
    <header style={styles.header} >
      <ScrollNav page={page} imgProps={logoImageProps} links={scrollLinks} sticky={true} />
      <Nav page={page} imgProps={logoImageProps} links={links} />
    </header>
  )
}

const styles = {
  header:{
    boxShadow: "0 10px 10px -10px rgba(0,0,0,0.25)"

  }
}


export default Header
