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
      id="Carousel"
      {...props}
    >
      <div
        className={`
            overflow-hidden 
            m-auto
            ${triple ? "triple-carousel" : "carousel"}
          `}
      >
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
  )
}