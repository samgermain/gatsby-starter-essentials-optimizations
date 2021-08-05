import React from "react"
import {useStaticQuery, graphql} from 'gatsby'
import { NavLink, NavBarProps} from 'interfaces'

import Nav, { ScrollNav } from 'components/Nav'
import {Page} from 'types';

const Header = ({page}:{page:Page}) => {

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
    }
  `)

  const links: [NavLink] = navBarProps.dataJson.navLinks
  const scrollLinks: [NavLink] = navBarProps.dataJson.scrollLinks

  return(
    <header className="shadow-2" >
      <ScrollNav page={page} links={scrollLinks} sticky={true} />
      <Nav page={page} links={links} />
    </header>
  )
}

export default Header
