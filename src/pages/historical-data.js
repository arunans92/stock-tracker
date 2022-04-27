import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const HistoricalData = () => (
  <Layout>
    <Seo title="Historical Data" />
    <h1>Historical Market Data</h1>
    <p>Historical Market Data Table comes here</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default HistoricalData
