import React from 'react'
import BackgroundImage from 'gatsby-background-image'

import {IArticlePreviewSquare} from 'interfaces'

export default ({square, className} : {square: IArticlePreviewSquare, className: string}) => {

  const {title, slug, imgProps} = square

  const styles = {
    bgImage: {
      width: '100%',
      height: '100%',
      borderRadius: '5px',
      overflow: 'hidden'
    },
    cover: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flexEnd',
        alignItems: 'flexEnd',
        textAlign: 'right',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.6))',
        transition: 'all 2.0s cubic-bezier(.25,.8,.25,1)'
    },
    title: {
      marginTop: 'auto',
      color: 'white',
      textShadow: '-1px -1px 0 $charc, 1px -1px 0 $charc, -1px 1px 0 $charc, 1px 1px 0 $charc',
      textDecoration: 'none',
      fontSize: '1.1em',
      marginRight: '3%',
      marginLeft: '3%'
    },
  }

  return (
    <a
      className={className}
      href={slug}
    >
      <BackgroundImage
        Tag="section"
        role="img"
        durationFadeIn={250}
        title={title}
        alt={title}
        style={styles.bgImage}
        className='hover-shadow'
        fluid={imgProps} 
      >
        <div style={styles.cover}>
          <h2 style={styles.title}>{title}</h2>
        </div>
      </BackgroundImage>
    </a>
  )
}