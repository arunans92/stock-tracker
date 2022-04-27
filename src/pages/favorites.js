import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Favorites = () => (
  <Layout>
    <Seo title="Favorites" />
    <h1>Favorites</h1>
    <p>Favorites Market Data Table comes here</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Favorites
