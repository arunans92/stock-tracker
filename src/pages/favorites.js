import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import FavCard from "../components/favCard"

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const favData = [
  { price: 1261.15, changePercent: -2.2932384, symbol: 'TECHM.NS' },
  { price: 1261.15, changePercent: 2.2932384, symbol: 'MARUTI.NS' },
  { price: 1261.15, changePercent: 2.2932384, symbol: 'ONGC.NS' },
  { price: 1261.15, changePercent: -2.2932384, symbol: 'ICICIBANK.NS' }
]

const Favorites = () => (
  <Layout>
    <Seo title="Favorites" />
    <Typography
      component="h2"
      variant="h4"
      color="inherit"
      noWrap
      sx={{ flexGrow: 1, mb: 2 }}
    >
      {'Favorites Market Data'}
    </Typography>

    <Grid container spacing={3} sx={{ mb: 4 }}>
      {favData.map((data) => (
        <Grid item xs={12} md={4} lg={3} key={data.symbol}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <FavCard data={data} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Layout>
)

export default Favorites
