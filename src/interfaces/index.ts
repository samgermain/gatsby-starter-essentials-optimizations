import { GatsbyImageProps} from 'gatsby-image'

export interface EmailFormQuery {
    dataJson: {
        emailJS: {
            serviceId: string,
            templateId: string,
            userId: string
        },
        recaptchaKey: string
    }
}

export interface FooterQuery {
    dataJson: {
        navLinks: [NavLink],
        businessNameFull: string
    }
    site: {
        siteMetadata: {
            themeColor: string,
            socialLinks: {
                facebook: string,
                instagram: string,
                linkedin: string,
                twitter: string            
            }
        }
    }
}

export interface IArticle{
    fields: {
        slug: string
    }
    html: string
    frontmatter: {
        title: string
        date: string
        author: string
        description: string
        featuredImage: {
            childImageSharp:GatsbyImageProps
        }
    }
}
export interface IArticleMetadata{
    description: string,
    title: string,
    image: string,
    slug: string
}

interface IContactSection{
    sections: {
        contact: {
            title: string
            subTitle: string
            phone: string
            email: string
        }
    }
}

export interface IHomePageQuery{
    allMarkdownRemark: {
        edges: {
            node: {
                fields: {
                    slug: string
                }
                frontmatter: {
                    title: string
                    featuredImage: {
                        childImageSharp: {
                            fluid: GatsbyImageProps
                        }
                    }
                }          
            }
        }
    }
    dataJson: IContactSection
}

export interface IContactPageQuery {
    dataJson: IContactSection
    site: {
        siteMetadata: {
            themeColor: string
        }
    }
}


interface IPageMetadata {
    title: string,
    slug: string
}

export type IMetadata = IArticleMetadata | IPageMetadata

export interface IArticlePage{
    dataJson: {
        businessNameFull: string
    }
    markdownRemark: IArticle
    site: {
        siteMetadata: {
            siteUrl: string
        }
    }
}

export interface IArticlePreviewSquare{
    title: string,
    slug: string,
    imgProps: GatsbyImageProps
}

export interface IHeaderQuery{
    site: {
        siteMetadata: {
          themeColor: string
          author: string
          authorDescription: string
          siteUrl: string
          description: string
        }
    }
    dataJson: {
        businessNameFull: string
    }
}
export interface MyImageProps {
    imgProps: GatsbyImageProps,
    alt: string,
    title: string
}

export interface NavLink {
    text: string,
    link: string
}

export interface NavBarProps {
    dataJson: {
        navLinks: [NavLink],
        scrollLinks: [NavLink]
    },
    logo: {
        childImageSharp: {
          fluid: GatsbyImageProps
        }
    }
}