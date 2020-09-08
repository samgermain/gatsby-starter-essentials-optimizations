const { createFilePath } = require(`gatsby-source-filesystem`)
const { fmImagesToRelative } = require('gatsby-remark-relative-images-v2');
const path = require("path")

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const postTemplate = path.resolve(`src/components/ArticlePage/index.tsx`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
 
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `${node.fields.slug}`,
      component: postTemplate,
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  fmImagesToRelative(node)
  
  if (node.internal.type === `MarkdownRemark`)
    actions.createNodeField({
      node,
      name: `slug`,
      value: createFilePath({ node, getNode, basePath: `pages`, trailingSlash: true}),
      
    })
  
}

