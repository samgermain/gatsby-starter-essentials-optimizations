import { IGatsbyImageData } from 'gatsby-plugin-image';
import { IArticle, IArticleMetadata } from 'interfaces';

class Article {
    
    date: Date
    title: string
    author: string 
    featuredImage: IGatsbyImageData
    slug: string
    description: string
    html: string
    
    constructor(data: IArticle){
        const {
            fields: {
                slug
            },
            html,
            frontmatter: {
                title,
                date,
                author, 
                description, 
                featuredImage: {
                    childImageSharp
                }
            }
        } = data

        this.title = title
        this.slug = slug
        this.author = author
        this.description = description
        this.featuredImage = childImageSharp
        this.date = new Date(date)
        this.html = html
    }

    get age(): number{
        /** The age in days of this article */
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var today = new Date()
        return Math.round(Math.abs((today.getTime() - this.date.getTime()) / oneDay));
    }

    get metaData(): IArticleMetadata {
        const title = `${this.title}` 
        return {
          description: this.description,
          title: title,
          image: 'this.featuredImage.publicURL',
          slug: this.slug
        }
    }

}

export default Article