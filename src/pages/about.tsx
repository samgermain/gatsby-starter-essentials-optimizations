import React from "react"
import {graphql} from 'gatsby'
import 'styles/main.scss'

import {Carousel, Layout} from "components"
import {Page} from 'types'
import { IArticlePreviewSquare } from 'interfaces'


const IndexPage = ({data}) => {

  const metadata = {
    title: 'About',
    slug: '/about'
  }

  const styles = {
    main: {
      maxWidth: 960
    }
  }

  const squares: [IArticlePreviewSquare] = data.allMarkdownRemark.edges.map((edge) => {
    const {
      node: {
        fields: {
          slug
        },
        frontmatter: {
          title,
          featuredImage:{
            childImageSharp:{
              fluid : imgProps
            }
          }
        },
      }
    } = edge

    return ({slug, title, imgProps})
  })

  return (
    <Layout metadata={metadata} page={Page.About}>
      <div className='mx-auto' style={styles.main}>
        <Carousel triple={true} squares={squares}  />
      </div>
    </Layout>
  )
}

export default IndexPage

export const aboutQuery = graphql`
  query{
    allMarkdownRemark {
      edges{
        node{
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 1950) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }          
        }
      }
    }
  }
`
