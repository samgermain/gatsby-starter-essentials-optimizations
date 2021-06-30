import React from "react"

import Layout from "../components/Layout"
import {Page} from 'types'

const NotFoundPage = () => {
  
  const metadata = {
    title: "404 - Not Found",
    slug: "/404",
  }

  return (
    <Layout metadata={metadata} page={Page.four}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage
