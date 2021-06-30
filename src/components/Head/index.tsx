/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import { IHeaderQuery} from 'interfaces'
import {Page} from 'types'

export default ({ metadata, page } : {lang?:String, metadata:any, page: Page}) => {
  
  const data: IHeaderQuery = useStaticQuery(graphql`
      query HeadQuery {
        site {
          siteMetadata {
            themeColor
            author
            authorDescription
            siteUrl
            description
          }
        }
        dataJson {
          businessNameFull
        }
      }
    `
  )

  let {themeColor, author, authorDescription, description, siteUrl} = data.site.siteMetadata
  const title = metadata && metadata.title 
  ? page === Page.Article 
    ? `${metadata.title} | ${data.dataJson.businessNameFull}`
    : `${data.dataJson.businessNameFull} | ${metadata.title}`
  : data.dataJson.businessNameFull
  description = metadata && metadata.description ? metadata.description : data.site.siteMetadata.description
  // const image = metadata.image

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      
      <link rel="canonical" href={`${data.site.siteMetadata.siteUrl}${metadata.slug}`} />
      <link rel="preload" href="https://fonts.googleapis.com/css?family=Montserrat|Helvetica+Neue|Helvetica|Arial&display=swap" /> 
      <meta charSet="utf-8" />
      
      <title>
        {title}
      </title>
      
      {(page === Page.Home || page === Page.Contact) && <script defer src={`https://www.google.com/recaptcha/api.js? r=${Math.random()}`} ></script>}
      
      <meta name="description" content={description} />
      <meta name="theme-color" content={themeColor || "#fff"} />
      <meta name="author" content={author} />
      <meta name="author:description" content={authorDescription} />
      
      <meta name="og:url" content={siteUrl} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property="og:image" content='https://suddenlysask.com/static/cc701b5ed9329f7c62ace15b5dfec7e6/d00b9/cat.webp' />

      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:creator' content={author} />
      <meta name="twitter:image" content='https://suddenlysask.com/static/cc701b5ed9329f7c62ace15b5dfec7e6/d00b9/cat.webp' />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:card" content="summary" />

    </Helmet>

  )
}


