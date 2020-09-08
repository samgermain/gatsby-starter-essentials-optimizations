import React, {useState, useEffect} from 'react'
import './style.scss'

import PreviewSqr from '../ArticlePreviewSquare'
import { IArticlePreviewSquare } from 'interfaces'

/**
 * A slide show of images, with arrows at the side, and dots to select the image underneath
 */
export default (
  {squares, triple, ...props} : {squares: [IArticlePreviewSquare], triple?: boolean}
) => {

  const styles = {
    carousel: {
      height: triple ? 700 : 466
    },
    container: {
      width: 'auto',
      position: 'relative',
      borderRadius: 5,
      overflow: 'hidden',
    },
    grid: {
      height: '80%',
      width: '80%',
      margin: 'auto'
    },
    tripleGrid: {
      height: '80%',
      width: '80%',
      margin: 'auto',
      display: 'grid',
      gridGap: 20,
      gridTemplate: 'repeat(3, 1fr) / repeat(2, 1fr)',
      gridTemplateAreas:
          `"u u"
          "u u"
          "d t"`,
    }
  }

  const [index, setIndex] = useState(0);
  const interval = 4000
  let timer: NodeJS.Timeout
  const [slides, setSlides] = triple ? useState(squares.slice(0,3)) : useState([squares[0]])

  const increment = (slideN: 1 | -1) => {
    const idx = index + slideN
    if (idx >= squares.length){
      setIndex(0)
    }else if(idx < 0){
      setIndex(squares.length - 1)
    }else{
      setIndex(idx)
    }
  }

  useEffect(() => {
    timer = setInterval(() => increment(1), interval)
    return () => {
      clearInterval(timer)
    }
  })

  useEffect(() => {
    if (triple){
      if(index === squares.length - 1){
        setSlides([squares[index]].concat(squares.slice(0,2)))
      }else if(index === squares.length - 2){
        setSlides(squares.slice(index, index+2).concat([squares[0]]))
      }else{
        setSlides(squares.slice(index, index+3))
      }
    }else{
      setSlides([squares[index]])
    }
  }, [index])

  /*The Arrows on the left/right of the slideshow*/
  const Cont = ({dir, inc, char} : {dir: 'prev', inc: -1, char: '&#10094;'} | {dir: 'next', inc: 1, char: '&#10095;'} ) => (
    <div className={`${dir}Cont`} onClick={() => increment(inc)}>
      <div className={dir}>{char}</div>
    </div>            
  )

  return (
    <div 
      style={styles.container}
      {...props}
    >
      <div style={styles.carousel} >
        <div style={triple ? styles.tripleGrid : styles.grid}>
          {slides.map((sqr, cnt) => (
            <PreviewSqr key={cnt} className={`slide-${cnt} fade-in`} square={sqr} />
          ))}
        </div>
        <Cont dir='prev' inc={-1} char='&#10094;' />
        <Cont dir='next' inc={1} char='&#10095;' />
        <br/>
        <div className='flex-center-row w-100'>
          {squares.map((entry, dotIndex) => (
            <div 
              key={dotIndex}
              className={`dot ${index === dotIndex && 'activeDot'}`}
              onClick={() => setIndex(dotIndex)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}