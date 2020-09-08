import React from 'react'
import './style.css'

/**
 * Titled text with bars to the left and right that stretch to the ends of the parent div
 * @param className : The class of the text component
 * @param text : The text in the middle of the bar
 */
export default ({text, className} : {text : string, className? : string}) => (
    <div className='barTitle'>
        <hr className='barTitleBar'></hr>
        <h1 className={`barTitleText ${className}`}>{text}</h1>
        <b className='barTitleBar'></b>
    </div>
)
