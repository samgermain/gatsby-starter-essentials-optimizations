import React from "react"
import {graphql} from 'gatsby'

import {EmailForm, Layout} from "components"
import {Page} from 'types'
import { IContactPageQuery } from 'interfaces'


const ContactPage = ({data}:{data:IContactPageQuery}) => {

    const { 
        dataJson: {
            sections: {
                contact: {
                    phone,
                    email
                }                
            }
        },
        site: {
            siteMetadata: {
                themeColor
            }
        }
    } = data

    const styles = {
        contactInfo:{
            backgroundColor: themeColor,
            borderRadius: '50%',
            maxWidth: 300
        }
    }

    const metadata = {
        title: 'Contact',
        slug: '/contact'
        }

  return (
    <Layout metadata={metadata} page={Page.Contact}>
        <div className='flex-center-col'>
            <h1>Contact</h1>
            <h3 className='mb-5' >Have a question? Email, Phone, or Text us!</h3>
            <div className='w-100 my-5 bs-center-row justify-content-around'>
                <EmailForm className='w-md-50' />
                <div className='mb-5 mt-md-0 mt-3 p-5 flex-center-col' style={styles.contactInfo}>
                    <span>{phone}</span>
                    <span>{email}</span>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ContactPage

export const ContactPageQuery = graphql`
  query{
    dataJson {
        sections{
            contact {
                phone,
                email
            }            
        }
    }
    site {
        siteMetadata {
            themeColor
        }
    }
  }
`
