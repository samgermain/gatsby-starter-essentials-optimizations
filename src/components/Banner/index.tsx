import React from 'react';

var Banner = (props) => {
    return (
        <div className='applewrap bannerCss' >
            <div className='imgWQuote'>
                <img className='imgCss' src={props.img}></img>
                <q className='lucida sloganCss' >{props.quote}</q>
            </div>
            <div className='hobo listCss'>
                <div className="liCss">
                    WEB DESIGN<br />MOBILE APP DESIGN<br />LOGO AND GRAPHIC DESIGN
                </div>
            </div>
            <p className='helvetica conCss'>
                <span>
                    Free consultation! <br />In person or<br />on the phone.
                    <br /><br />
                    <a id='contactUsCircle' href='./Contact.html'>Contact us</a>
                </span>
            </p>
        </div>
    )
}

export default Banner; 