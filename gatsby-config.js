const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Web Dexter | Saskatoon Website Design and Mobile App Design`,
    description: `Web Dexter is a web design, and mobile app design company located in Saskatoon, SK. We also do logo design and graphic design.`,
    author: `Web Dexter Design`,
    authorDescription: "Saskatoon Web and App Design Company",
    themeColor: "#d2f5fb",
    siteUrl: "https://webdexter.ca",
    socialLinks: {
      facebook: "/",
      instagram: "/",
      linkedin: "https://linkedin.com/company/web-dexter",
      twitter: "/"
    }
    // image: "https://suddenlysask.com/static/54f3be73c004e26215a4a0cbf82c4524/ad85c/suddenly-saskatchewan-logo.webp"
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/markdown/`,
        name: `markdown-pages`,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [
        `/contact/*`,
      ] },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-relative-images-v2',
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: "transparent",
              maxWidth: "1950",
              disableBgImageOnAlpha: true,
              linkImagesToOriginal: false,
              withWebp: true,
              loading: "eager"
              
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        "components": path.join(__dirname, "src/components"),
        "styles": path.join(__dirname, "src/assets/styles"),
        "interfaces": path.join(__dirname, "src/interfaces"),
        "data": path.join(__dirname, 'src/data'),
        "pages": path.join(__dirname, 'src/pages'),
        "svg": path.join(__dirname, "src/assets/images/svg"),
        "hooks": path.join(__dirname, "src/hooks"),
        "types": path.join(__dirname, "src/types")
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
    // `gatsby-plugin-preact`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    { 
      resolve: `gatsby-plugin-purgecss`,
      options: {
        // printRejected: true, // Print removed selectors and processed file names
        // purgeOnly: ['src/assets/styles', 'src/components','node_modules/'],
        // ignore: ['node_modules/'],
        whitelist: [],
        whitelistPatterns: []
      }
    },
  ],
}
