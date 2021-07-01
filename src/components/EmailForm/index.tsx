import React from 'react'
import './style.scss'
import {graphql, useStaticQuery} from 'gatsby'

import emailjs from 'emailjs-com'
//Visit this StackOverflow answer for instructions on how to use emailjs https://stackoverflow.com/a/61582486/6331353
import {Form, Row, Col, Button} from 'react-bootstrap'

import {EmailFormQuery} from 'interfaces'

const FormControl = (
    {label} : {label : string}
    ) => {
    let type = "text"
    let name
    switch (label) {
        case 'Name':
            name='from_name'
            break
        case 'Email':
            type = 'email'
            name = 'from_email'
            break
        case 'Subject':      
            name='subject'      
            break
        case 'Message':
            return <Form.Control as="textarea" name='html_message' placeholder={label} />
            break
    }
    return <Form.Control as="input" type={type} name={name} placeholder={label} />
}

export default (props) => {

    const data: EmailFormQuery = useStaticQuery(graphql`
        query EmailFormQuery {
            dataJson {
                emailJS{
                    serviceId,
                    templateId,
                    userId
                },
                recaptchaKey
            }
        }
    `)

    const sendEmail = function(e){
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        const {serviceId, templateId, userId} = data.dataJson.emailJS
        emailjs.sendForm(serviceId, templateId, e.target, userId).then((result) => {
            window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
        }, (error) => {
            console.log(error.text);
        });
    }

    return (
        <Form id='emailForm' {...props} onSubmit={sendEmail}>
            {['Name', 'Email', 'Subject', 'Message'].map(label => (
                <Form.Group as={Row}>
                    <Form.Label column sm={2} >
                        {label}
                    </Form.Label>
                    <Col sm={10} >
                        <FormControl label={label} />
                    </Col>
                </Form.Group>
            ))}
            <Row sm={10} className='ml-auto'>
                <div className="m-auto m-sm-0 g-recaptcha" data-sitekey={data.dataJson.recaptchaKey}></div>
                <Form.Group className='ml-auto mb-md-auto'>
                    <Button 
                        variant="primary"
                        className='mt-2 ml-2 mt-sm-0 mr-2'
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form.Group>
            </Row>
        </Form>

    )
}