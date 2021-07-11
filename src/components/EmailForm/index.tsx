import React from 'react';
import './style.scss';
import {graphql, useStaticQuery} from 'gatsby';

//Visit this StackOverflow answer for instructions on how to use emailjs https://stackoverflow.com/a/61582486/6331353
import emailjs from 'emailjs-com';
import {EmailFormQuery} from 'interfaces';

const FormControl = (
    {label, className="", ...props} : 
    {label : string, className? : string}
) => {

    let type = "text";
    let name: string;

    switch (label) {
        case 'Name':
            name='from_name';
            break;
        case 'Email':
            type = 'email';
            name = 'from_email';
            break;
        case 'Subject':      
            name='subject';
            break;
        case 'Message':
            return (
                <textarea 
                    name='html_message'
                    placeholder={label}
                    className={`form-control ${className}`}
                />
            );
            break;
    };

    return (
        <input 
            type={type} 
            name={name} 
            placeholder={label} 
            className={`form-control ${className}`}
            {...props}
        />
    );
};

export default (
    {className="", ...props} : 
    {className? : string}
) => {

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
    `);

    const sendEmail = function(e){
        e.preventDefault();    //This is important, but the email won't send without it
        const {serviceId, templateId, userId} = data.dataJson.emailJS;
        emailjs.sendForm(serviceId, templateId, e.target, userId).then((result) => {
            //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
            window.location.reload();
        }, (error) => {
            console.log(error.text);
        });
    };

    return (
        <form 
            id='email-form' 
            className={`d-flex flex-column align-items-start ${className}`}
            onSubmit={sendEmail} 
            {...props}
        >
            {['Name', 'Email', 'Subject', 'Message'].map(label => (
                <div className="row w-100 my-2">
                    <label className="col-sm-2"  >
                        {label}
                    </label>
                    <div className="col-sm-10" >
                        <FormControl label={label} />
                    </div>
                </div>
            ))}
            <div 
                className='
                    d-flex 
                    flex-md-row 
                    flex-column 
                    justify-content-between 
                    align-items-end 
                    w-100
                '
            >
                <div 
                    className="m-auto m-sm-0 g-recaptcha" 
                    data-sitekey={data.dataJson.recaptchaKey}
                ></div>
                <button
                    className='mt-2 ml-auto mt-sm-0 mr-2 btn btn-primary'
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};