import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BatchReport = () => (
  <Layout>
    <Seo title="Batch Report" />
    <h1>Batch Report</h1>
    <p>Batch Report Table comes here</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default BatchReport
