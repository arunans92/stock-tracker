import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const MarketData = () => (
  <Layout>
    <Seo title="Market Data" />
    <h1>Market Data</h1>
    <p>Market Data Table comes here.</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default MarketData
