import React, { Component } from "react";

//TODO: Make the slideshow not move when the picture changes
class Services extends Component {
    constructor(props){
        super(props);
        var p = props;
    }
    componentDidMount(){
        var sectionName = window.location.hash.slice(1);
    
        //then show the section
        if (document.getElementById(sectionName) != null){
            document.getElementById(sectionName).scrollIntoView();
        }
    }
    render(){
        return (
            <main className='shadow1' id='services'>
                <PicsWText id='webDesign' serv={Service1}/>
                <Service id='mobileAppDesign' serv={Service2}/>
                <Service id='logoDesign' serv={Service3}/>
                <Service id='searchEngineOptimization' serv={Service4}/>
                <Service id='techSupport' serv={Service5}/>
            </main>
        )
    }
}

var PicsWText = (props) => {
    var serv = props.serv;
    return (

        <section id={props.id} className="service" >
            <div className="serviceTitles">
                <h1 id={serv.t1s} className="tilted title1Style">{serv.t1}</h1>
            </div>
            <div id="divStyle1" className="divStyle">    
                <div id='style1Side'><h3 className='title2Style1'>{serv.t2}</h3><img id={serv.is} src={serv.i}></img></div>
                {serv.sd}
            </div>
            <p id={serv.ds} className="descStyle">{serv.d}</p>   
        </section>
    )
}

//TODO: THE SEO PICTURE IS REALLY SMALL IN FIREFOX
var Service = (props) => {
    var serv = props.serv;
    return (
        <React.Fragment>
        <hr style={{display:'none'}}></hr>
        <section id={props.id} className="deskService service">
                <div className="serviceTitles">
                    <h1 id={serv.t1s} className="tilted title1Style">{serv.t1}</h1>
                    <h2 id={serv.t2s} className="deskT2 title2Style helvetica">{serv.t2}</h2>
                    <div className="phoneTitleImg">
                        <h2 className="title2Style helvetica">{serv.t2}</h2>
                        <img className="imgStyle" src={serv.i}></img>
                    </div>             
                </div>
                <div id={serv.divStyle} className="divStyle">
                    <p id={serv.ds} className="descStyle helvetica">{serv.d}</p>
                    <img id={serv.is} className="deskImg imgStyle" src={serv.i}></img> 
                    {serv.sd}
                </div>
            
        </section>
        </React.Fragment>
    )
}

export default Services;