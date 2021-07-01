import React, {useState, useEffect, useRef} from 'react'
import './style.scss'

import Img from "gatsby-image"
import {Link} from 'gatsby'
import * as Scroll from 'react-scroll'

import {MyImageProps, NavLink} from 'interfaces'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { Page } from 'types'

const scrollOffset = -50
const topDiv = "___gatsby"     //Div at the top of the page
const stickyHeight = 60       //Height of the sticky navbar
const bpSwch = 'md'           //The breakpoint to switch to a burger menu
const bgColor = '#f8f9fa'

const zIndex = {
  "highest": 100,
  "higherer": 80,
  "higher": 50,
  "high": 20
}

const Burger = ({ open, setOpen, ...props }) => {

  const styles = {
    button: {
      top: '5%',
      right: '2rem',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: "space-around",
      width: "2rem",
      height: "2rem",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: 0,
      zIndex: 999   
    },

    span: {
      width: '2rem',
      height: '0.25rem',
      background: '#0D0C1D',
      borderRadius: 10,
      transition: 'all 0.3s linear',
      position: 'relative' as const,
      transformOrigin: 1,
    },
    
    span1: {
      transform: `${ open ? 'rotate(45deg)' : 'rotate(0)'}`
    },

    span2: {
      opacity: `${ open ? '0' : '1'}`,
      transform: `${ open ? 'translateX(20px)' : 'translateX(0)'}`
    },

    span3: {
      transform: `${ open ? 'rotate(-45deg)' : 'rotate(0)'}`
    }
    
  }

  return (
    <button style={styles.button} aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} {...props}>
      <span style={{...styles.span, ...styles.span1}} />
      <span style={{...styles.span, ...styles.span2}} />
      <span style={{...styles.span, ...styles.span3}} />
    </button>
  )
  
}

const BurgerMenu = (
  { open, dropdown, navHeight=60, className="", children }:
  {open: boolean, dropdown?: boolean, navHeight?: number, className?: string, children: any}
) => {

  const axis = dropdown ? 'Y(-' : 'X('

  let style = {
    ...{
      display: 'flex',
      backgroundColor: bgColor,
      flexDirection: 'column' as const,
      justifyContent: 'center',
      height: !dropdown && '100vh',
      textAlign: 'left' as const,
      padding: '2rem',
      position: 'absolute' as const,
      marginTop: dropdown && navHeight, 
      transform: open ? `translate${axis}0)` : `translate${axis}100%)`,
      top: 0,
      right: 0,
      transition: 'height 0.3s ease-in-out, transform 0.3s ease-in-out',
      zIndex:  zIndex.high 
    },
    ...styles.navShadow
  }

  return (
    <nav 
      id='burgerMenu'
      style={style}
      aria-hidden={!open}
      className={className}
    >
      {children}
    </nav>
  )
}


const ScrollLink = (
  {to, className, children, style} : {to : string, className? : string, children: any, style?:any}
  ) => {
  return (
    <Scroll.Link
      to={to}
      className={className}
      activeClass={to === topDiv ? "" : "active"}
      spy={true}
      smooth={true}
      offset={scrollOffset}
      duration={500}
      style={{...styles.link, ...style}}
    >
      {children}
    </Scroll.Link>
  )
}

const PageLinks = (
  {className, page, links} : { className? : string, page: Page, links: [NavLink]}
) => {
  return (
    <>
      {
        links.map(({text, link}) => (
        <Link  
          to={link}
          key={link}
          className={`
            text-nowrap 
            nav-link 
            ${className}
            ${text === page && 'active'}`
          }
          style={styles.link}
        >
          {text}
        </Link>
        ))
      }
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

const Layout = (
  {imgProps, sticky, page, children} : {imgProps:MyImageProps, sticky?:boolean, page: Page, children:any}
) => {
  
  const [isHidden, setIsHidden] = useState(true);
  const [open, setOpen] = useState(false);
  const node = useRef();

  const hideBar = () => {
    setOpen(false)
    const pos = window.pageYOffset;
    pos > 100 ? setIsHidden(false) : setIsHidden(true) //TODO: Dynamic position instead of 150
  }

  useEffect(() => {
    hideBar()
    window.addEventListener("scroll", hideBar, { passive: true });
    return () => {
      window.removeEventListener("scroll", hideBar);
    };
  }, []);

  const style={
    ...(sticky && styles.stickyNav),
    ...(sticky && isHidden && styles.hide),
    ...styles.navBar
  }

  const stickyStyle = {
    ...(sticky && !isHidden && styles.navShadow), 
    ...style
  }

  const NavBrand = () => {

    const style= sticky ? {...styles.navBrand, ...styles.navBrandSticky} : styles.navBrand

    const NavBrandImage = () => (
      <Img 
        className=''
        fluid={imgProps.imgProps}
        fadeIn={false} 
        title={imgProps.title} 
        alt={imgProps.alt} 
        loading="eager"
        imgStyle={{objectFit: 'contain' }}
      ></Img>
    )

    if (page === Page.Home){
      return (
        <ScrollLink
          style={style}
          to={topDiv}
        >
          <NavBrandImage />
        </ScrollLink>
      )
    }else{
      return (
        <Link
          style={style}
          to={"/"}
          className="navbar-brand"
        >
          <NavBrandImage />
        </Link>
      )
    }  
  }

  useOnClickOutside(node, () => setOpen(false));
  
  return (
    <div ref={node}>  
      <div style={stickyStyle}>
        <BurgerMenu dropdown={false} className={`only-lt-${bpSwch} navbar-nav nav-pills`} data-spy='affix' open={open}>
            {children}
        </BurgerMenu>
        <nav style={style} className='navbar navbar-expand-md navbar-light bg-light px-4'>
          <NavBrand />
          <nav className={`only-gt-${bpSwch} nav nav-pills`} data-spy='affix' style={styles.nav}>
            {children}
          </nav>
          <Burger className={`only-lt-${bpSwch} my-auto`} open={open} setOpen={setOpen} />
        </nav>
      </div>
    </div>
  )
  
}



const ScrollNav = (
  {imgProps, links, sticky, page}:{imgProps:MyImageProps, links: [NavLink], sticky?: boolean, page: Page}
) => (
  <Layout {...{imgProps, sticky, page}}>
    <ScrollLinks links={links} />
  </Layout>
)

const FooterNav = ({links, page}:{links: [NavLink], page?: Page}) => (
  <nav className='footerNav' style={styles.footerNav}>
    <PageLinks links={links} page={page}/>
  </nav>
)

export default ({imgProps, links, page, sticky}:{imgProps:MyImageProps, links: [NavLink], page: Page, sticky?: boolean}) => (
  <Layout {...{imgProps, sticky, page}} >
    <PageLinks {...{page, links}} />
  </Layout>
)

const styles = {
  footerNav:{
    display: 'flex',
    textAlign: 'center' as const
  },
  hide: {  
    top: -stickyHeight
  },
  link:{
    marginLeft:10,
    marginRight:10,
    padding: 0,
    cursor: 'pointer'
  },
  nav:{
    marginLeft: 'auto',
    marginRight: 20
  },
  navBar:{
    display: 'flex',
    width: '100%',
    backgroundColor: bgColor,
    padding: 0,
    height: 80,
    marginTop: 'auto',
    marginBottom: 'auto',
    zIndex: zIndex.higherer
  },
  navBrand: {
    width: '80px',
    marginTop: '2px',
    marginBottom: '2px'
  },
  navBrandSticky: {
    width: '50px',
    marginTop: '0',
    marginBottom: '0'
  },
  navShadow:{
    boxShadow: "0 10px 15px -12px rgba(0,0,0,0.25)"
  },
  stickyNav: {
    height: stickyHeight,
    position: "fixed" as const,
    top: 0,
    zIndex: zIndex.higher,
    transition: ".3s"
},
}

export {
  FooterNav,
  ScrollNav
}
