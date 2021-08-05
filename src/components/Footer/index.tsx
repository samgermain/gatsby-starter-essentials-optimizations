import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import "./style.scss"

import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { FooterQuery } from "interfaces"
import { FooterNav } from "components/Nav"

const SocialIcon = ({ icon, link, ...props }) => (
    <a href={link} {...props}>
      <FontAwesomeIcon className="social-icon" icon={icon} />
    </a>
  );

const Footer = ({ className = "", ...props }) => {
  const data: FooterQuery = useStaticQuery(graphql`
    query FooterQuery {
      dataJson {
        navLinks {
          text
          link
        }
        businessNameFull
      }
      faceIcon: file(name: { eq: "face-icon" }) {
        childImageSharp {
          fixed {
            src
            srcSet
            srcWebp
            srcSetWebp
            tracedSVG
            base64
          }
        }
      }
      site {
        siteMetadata {
          themeColor
          author
          authorLink
          socialLinks {
            facebook
            instagram
            linkedIn
            twitter
          }
        }
      }
    }
  `);

  const { facebook, instagram, linkedIn, twitter } = data.site.siteMetadata.socialLinks;

  return (
    <footer
      className={`position-relative bg-light overflow-hidden shadow-2 p-3 flex-center-col ${className}`}
      {...props}
    >
      <FooterNav links={data.dataJson.navLinks} />

      <div className={`flex-center-col h6 mt-4 ${className}`}>
        <span className="p-3">{`© Me ${new Date().getFullYear()}`}</span>
        <span className="flex-center-row">
          <span>Website designed by</span>
          <div style={{ width: 3 }}></div>
          <a className="flex-center-row" href={data.site.siteMetadata.authorLink}>
            {data.site.siteMetadata.author}
            <Image
              fixed={data.faceIcon.childImageSharp.fixed}
              className="icon"
              alt="Picture of Sam Germain"
            />
          </a>
        </span>
      </div>
      <div className="mr-sm-5 mr-2 social-icons">
        <div>
          <SocialIcon
            aria-label="Facebook social media page"
            link={facebook}
            icon={faFacebookF}
          />
          <SocialIcon
            aria-label="Instagram social media page"
            link={instagram}
            icon={faInstagram}
          />
        </div>
        <div>
          <SocialIcon
            aria-label="LinkedIn social media page"
            link={linkedIn}
            icon={faLinkedinIn}
          />
          <SocialIcon
            aria-label="Twitter social media page"
            link={twitter}
            icon={faTwitter}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
