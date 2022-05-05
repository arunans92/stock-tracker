import * as React from "react"
import { Link } from "gatsby"
import Button from "@mui/material/Button";

import Layout from "../components/layout"
import Seo from "../components/seo"
import { invokeHelloFunction } from '../services/invokeFunctionService'
function invokefunction() {

  invokeHelloFunction();

}
const MarketData = () => (
  <Layout>
    <Seo title="Market Data" />
    <h1>Market Data</h1>
    <p>Market Data Table comes here.</p>
    <Link to="/">Go back to the homepage</Link>
    <Button
      onClick={invokefunction}
      color="inherit"
    > Get Data </Button>
  </Layout>
)

export default MarketData
