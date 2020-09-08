import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";
import { faFacebookF, faTwitter, faLinkedinIn, faRedditAlien, faWhatsapp, IconDefinition } from '@fortawesome/free-brands-svg-icons'
import {faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'

import {Article} from 'types'

const ShareButtons = (
    {art, className} : {art: Article, className? : string}
  ) => {
  
    const {
      site: {
        siteMetadata: {
          siteUrl
        }
      },
      dataJson: {
        businessNameFull
      }
    } = useStaticQuery(graphql`
        query ShareButtonQuery {
          site {
            siteMetadata {
              siteUrl
            }
          }
          dataJson {
            businessNameFull
          }
        }
      `
    )
  
    const butCls='m-md-1 m-p5'
    const url = `${siteUrl}${art.slug}`
  
    const FaIcon = ({icon} : {icon: IconDefinition}) => {
  
      return (
        <div className='faCircleContainer'>
          <FontAwesomeIcon className='faCircle' size={'2x'} icon={icon} />
        </div>
      )
    }
  
    return (
      <div className={`${className} d-flex`}>
        <FacebookShareButton 
          className={butCls}
          url={url}
        >
          <FaIcon icon={faFacebookF} />
        </FacebookShareButton>
        
        <TwitterShareButton 
          className={butCls}
          url={url}
          title={art.title}
          //hashtags={["WebDexter", "WebDexterDesign"]}
        >
          <FaIcon icon={faTwitter} />
        </TwitterShareButton>
        
        <LinkedinShareButton
          className={butCls}
          url={url}
          title={art.title}
          summary={art.description} //Doesn't show up
          source={url}
        >
          <FaIcon icon={faLinkedinIn} />
        </LinkedinShareButton>
        
        <RedditShareButton
          className={butCls}
          url={url}
          title={art.title}
        >
          <FaIcon icon={faRedditAlien} />
        </RedditShareButton>
        
        <WhatsappShareButton  //TODO: test this
          className={butCls}
          url={url}
          title={art.title}
        >
          <FaIcon icon={faWhatsapp} />
        </WhatsappShareButton>
        
        <EmailShareButton 
          className={butCls}
          url={url}
          subject={`${art.title} | ${businessNameFull}`}
          body={art.description}
          separator={"\n\n"}
        >
          <FaIcon icon={faEnvelopeOpen} />
        </EmailShareButton>    
      </div>
    )
  }

export default ShareButtons