import React, { useState, useEffect, useRef } from "react"
import "./style.scss"
import { Link } from "gatsby"

import { NavLink } from 'interfaces'
import { useOnClickOutside } from "hooks"
import {Page} from 'types'

import Burger from "./Burger"
import BurgerMenu from "./BurgerMenu"
import ScrollLink from "./ScrollLink"

import ReactLogo from "svg/gatsby-icon.svg"

const stickyHeight = 60 //Height of the sticky navbar

const PageLinks = (
  { links, className = "", page}:
  { links: [NavLink], className?: string, page: Page}
) => {
  return (
    <>
      {links.map(({link, text}) => {
        const active = page == text || (page == "/" && text == "Home")
        return (
          <Link
            to={link}
            key={text}
            className={`
              text-nowrap 
              nav-link 
              cursor-pointer
              h4
              mx-3
              p-0
              ${active ? "active" : ""}
              ${className}
            `}
          >
            {text}
          </Link>
        )
      })}
    </>
  )
}

const ScrollLinks = (
  {links, className} : {links: [NavLink], className? : string}
) => {
  return (
    <>
      {links.map(({text, link}) => (
          <ScrollLink
            className={
              `
              text-nowrap 
              nav-link 
              ${className}
            `}
            key={link}
            to={link}
          >
          {text}
        </ScrollLink>
      ))}
    </>
  )
}

const NavBrand = ({ children, page }:{ children:any, page: Page }) => {

  if ( page == "/") {
    return (
      <ScrollLink to="root" className="cursor-pointer mx-3 p-0 h-100">
        {children}
      </ScrollLink>
    )
  } else {
    return (
      <Link to="/" className="navbar-brand p-0 h-100">
        {children}
      </Link>
    )
  }
}

const Layout = ({ sticky, page, children }: 
  { sticky: boolean, page: Page, children: any }
) => {
  const [isHidden, setIsHidden] = useState(true)
  const [open, setOpen] = useState(false)
  const node = useRef()

  const hideBar = () => {
    setOpen(false)
    const pos = window.pageYOffset
    pos > 100 ? setIsHidden(false) : setIsHidden(true) //TODO: Dynamic position instead of 150
  }

  useEffect(() => {
    //Hides and reveals the sticky navbar
    hideBar()
    window.addEventListener("scroll", hideBar, { passive: true })
    return () => {
      window.removeEventListener("scroll", hideBar)
    }
  }, [])

  const style = {
    top: sticky && isHidden ? -stickyHeight : 0,
    height: stickyHeight,
    transition: ".3s"
  }

  useOnClickOutside(node, () => setOpen(false))

  return (
    <div ref={node}>
      <div
        className={`
          d-flex 
          w-100 
          p-0 
          my-auto 
          z-index-4 
          
          ${sticky && "position-fixed"}
        `}
        style={style}
      >
        <BurgerMenu
          dropdown={false}
          className={`d-md-none navbar-nav nav-pills`}
          data-spy="affix"
          open={open}
        >
          {children}
        </BurgerMenu>
        <nav style={style} className="navbar w-100 bg-light px-4">
          <NavBrand page={page}>
            <ReactLogo
              className="h-100"
              title="React Logo"
              alt="SVG of the react logo"
            />
          </NavBrand>
          <div
            className={`d-md-flex d-none nav nav-pills mr-3 ml-auto`}
            data-spy="affix"
          >
            {children}
          </div>
          <Burger
            className={`d-md-none my-auto`}
            open={open}
            setOpen={setOpen}
          />
        </nav>
      </div>
    </div>
  )
}

export const FooterNav = ({ links, page }: { links: [NavLink], page: Page }) => (
  <nav className="footer-nav nav nav-pills">
    <PageLinks links={links} page={page}/>
  </nav>
)

export const ScrollNav = (
  {links, page, sticky}:
  {links: [NavLink], page: Page, sticky?: boolean}
) => (
  <Layout page={page} sticky={sticky}>
    <ScrollLinks links={links}/>
  </Layout>
)

export default (
  { links, page, sticky = false }:
  { links: [NavLink], page: Page, sticky?: boolean}
) => (
  <Layout page={page} sticky={sticky}>
    <PageLinks links={links} page={page}/>
  </Layout>
)
