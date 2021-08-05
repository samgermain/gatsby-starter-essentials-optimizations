const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Essentials & Pagespeed Optimization`,
    description: `Contains all the things that most people would want on a static blog website, like sharing, email form, drop down nav..., and lighthouse optimization plugins`,
    author: `Sam Germain`,
    authorDescription: "Full Stack Developer",
    authorLink: "https://samgermain.com",
    themeColor: "#d2f5fb",
    siteUrl: "https://samgermain.com",
    socialLinks: {
      facebook: "/",
      instagram: "/",
      linkedin: "https://linkedin.com/in/samgermain",
      twitter: "/",
    },
    image:
      "https://suddenlysask.com/static/cc701b5ed9329f7c62ace15b5dfec7e6/d00b9/cat.webp",
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
      options: { prefixes: [`/contact/*`] },
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
        icon: `src/assets/images/gatsby-icon-128.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: "transparent",
              maxWidth: "1950",
              disableBgImageOnAlpha: true,
              linkImagesToOriginal: false,
              withWebp: true,
              loading: "eager",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        components: path.join(__dirname, "src/components"),
        styles: path.join(__dirname, "src/assets/styles"),
        interfaces: path.join(__dirname, "src/interfaces"),
        data: path.join(__dirname, "src/data"),
        pages: path.join(__dirname, "src/pages"),
        svg: path.join(__dirname, "src/assets/images/svg"),
        hooks: path.join(__dirname, "src/hooks"),
        types: path.join(__dirname, "src/types"),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
    // `gatsby-plugin-preact`, //Gives better page load speeds
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Essentials & Optimization`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#d2f5fb`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon-128.png`,
        icon_options: {
          purpose: `maskable any`,
        },
        icons: [
          {
            src: `src/assets/images/gatsby-icon-128.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `src/assets/images/gatsby-icon-512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     // printRejected: true, // Print removed selectors and processed file names
    //     // purgeOnly: ['src/assets/styles', 'src/components','node_modules/'],
    //     // ignore: ['node_modules/'],
    //     whitelist: [],
    //     whitelistPatterns: [/svg.*/, /fa.*/, /react-share.*/],
    //   },
    // },
  ],
}
