import React, {useEffect} from "react"
import './style.scss'
import { graphql } from "gatsby"

import {FlexCenterRow} from 'components/Bootstrap-plus'
import {Layout, ShareButtons} from 'components'
import {IArticlePage} from 'interfaces'
import {Article, Page} from 'types'

const ArticleBanner = ({art}:{art:Article}) => (
  <div className='articleBanner'>
    <small id="articleDate" ><p className='mb-2'>{new Date(art.date).toDateString()}</p></small>
    <h1 className='titleOfArticle'>{art.title}</h1>

    {art.author && <small><p className='writtenBy'>Written by {art.author}</p></small>}
    <div className="shareBlock">
      <hr className='shareButtonHr'/>
      <ShareButtons art={art} />
      <hr className='shareButtonHr'/>
    </div>
  </div>
)

const ArticlePage = ({ data }: { data: IArticlePage }) => {

  const art = new Article(data.markdownRemark)

  useEffect(() => {
      window.scrollTo(0,0)
  }, [data])
  
  return (
    <Layout metadata={art.metaData} page={Page.Article}>
      <ArticleBanner art={art} />

      <FlexCenterRow>
        <div className='col-lg-3 only-gt-lg'></div>
        <div className='col-lg-6 col-11 m-auto'>  
          <div id="article-content" dangerouslySetInnerHTML={{ __html: art.html }} />
        </div>
        <div className='col-lg-3 only-gt-lg'></div>
      </FlexCenterRow>
      
    </Layout>
  )
}

export default ArticlePage

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY  hh:mm a")
        author
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 1400)
          }
          publicURL
        }
      }
    }
    dataJson{
      businessNameFull
    }
    site{
      siteMetadata{
        siteUrl
      }
    }
  }
`
