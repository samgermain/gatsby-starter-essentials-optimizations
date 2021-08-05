import React from "react"
import {graphql} from 'gatsby'

import {Carousel, EmailForm, Layout} from "components"
import {Page} from 'types'
import { IArticlePreviewSquare } from 'interfaces'

const IndexPage = ({data}) => {

  const {
      sections: {
        contact: {
          phone: contactPhone,
          email: contactEmail
        }
      }
  } = data.dataJson

  const metadata = {
    title: 'Home',
    slug: '/'
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
    <Layout metadata={metadata} page={Page.Home}>
      <div className='mx-auto col-sm-10 ' style={styles.main}>
        <h1>Hi people</h1>
        <p>This is a simple Gatsby site, with an email form, a carousel, bootstrap, recaptcha and social media shares.</p>
        <Carousel squares={squares}  />
        <div id='EmailForm' className='col-10 mx-auto flex-center-col'>
          <h2>Contact</h2>
          <h5 className='text-center mt-1' >Have a question? Email, Phone, or Text us!</h5>
          <EmailForm className='w-100 my-5' />
          <p>{contactPhone}</p>
          <p>{contactEmail}</p>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
  dataJson {
    sections {
      contact {
        phone
        email
      }
    }
  }
}
`
