import React from "react"
import './style.scss'
import {useStaticQuery, graphql} from 'gatsby'

import { faFacebookF, faTwitter, faLinkedinIn, faInstagram, IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome'

import FaceIcon from 'svg/face-icon.svg';

import {FooterNav} from 'components/Navi'
import {FooterQuery, NavLink} from 'interfaces'

const Header = () => {

  const data: FooterQuery = useStaticQuery(graphql`
    query FooterQuery {
      dataJson {
        navLinks {
          text,
          link
        }
        businessNameFull
      }
      site {
        siteMetadata {
          themeColor,
          socialLinks{
            facebook,
            instagram,
            linkedin,
            twitter            
          }
        } 
      }
    }
  `)

  const iconColors = {
      'twitter': {
        color: "#00acee"
      }, 
      'facebook': {
        color: "#3b5998"
      },
      'linkedin': {
        color: "#0e76a8"
      },
      'instagram': {
        color: "#fb3958"
      }
  }

  const styles = {
    bottomBlurb:{
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems:'center',
      marginTop: "20px",
      fontSize:'0.7em'
    },
    copyright:{
      padding: "10px"
    },
    footer: {
      backgroundColor: data.site.siteMetadata.themeColor,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column' as const, 
      alignItems: 'center',
      position: 'relative' as const,
      padding: 10,
      boxShadow: '0 -10px 10px -10px rgba(0,0,0,0.25)',
      overflow: 'hidden'
    },
    icon: {
      width: 25
    },
    socialIcons: {
      position: 'absolute' as const,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      right: 0,
      
      top: "50%"
    },
    tag: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',  
      height: 40
    }
  }

  const links: [NavLink] = data.dataJson.navLinks

  const SocialIcon = ({icon, link, style}:{icon: IconDefinition, link: string, style?: any}) => (
    <a href={link}>
      <FontAwesomeIcon className="socialIcon" style={style} icon={icon} />
    </a>
  )

  const {facebook, instagram, linkedin, twitter} = data.site.siteMetadata.socialLinks

  return(
    <footer style={styles.footer} >
      <FooterNav links={links} />
      
      <div style={styles.bottomBlurb}>
        <span style={styles.copyright}>{`© ${data.dataJson.businessNameFull} ${new Date().getFullYear()}`}</span>
        <span style={styles.tag}>
          <span>Website designed by </span>
          <a href="https://samgermain.com">
            Sam Germain
            <FaceIcon style={styles.icon} />
          </a>
        </span>
      </div>
      <div className="flex-center-sm-row mr-sm-5 mr-2" style={styles.socialIcons}>
        <div>
          <SocialIcon style={iconColors.facebook} link={facebook} icon={faFacebookF} />
          <SocialIcon style={iconColors.instagram} link={instagram} icon={faInstagram} />
        </div>
        <div>
          <SocialIcon style={iconColors.linkedin} link={linkedin} icon={faLinkedinIn} />
          <SocialIcon style={iconColors.twitter} link={twitter} icon={faTwitter} />
        </div>
      </div>
      
    </footer>
  )
}

export default Header
