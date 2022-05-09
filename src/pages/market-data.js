import * as React from "react"
import Button from "@mui/material/Button";

import Layout from "../components/layout"
import Seo from "../components/seo"
import marketLiveData from "../marketLiveData";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



// function invokefunction() {

//   getDataFromRapidAPI();

// }

const symbols = [
  { label: 'TECHM.NS', symbol: 'TECHM.NS' },
  { label: 'MARUTI.NS', symbol: 'MARUTI.NS' },
  { label: 'ONGC.NS', symbol: 'ONGC.NS' },
  { label: 'ICICIBANK.NS', symbol: 'ICICIBANK.NS' },
  { label: 'WIPRO.NS', symbol: 'WIPRO.NS' },
  { label: 'ULTRACEMCO.NS', symbol: 'ULTRACEMCO.NS' },
  { label: 'TITAN.NS', symbol: 'TITAN.NS' },
  { label: 'SHREECEM.NS', symbol: 'SHREECEM.NS' }
]

const MarketData = () => {
  const [symbolList, setSymbolList] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('');
  const [liveMarketData, setLiveMarketData] = React.useState(null);

  const vertical = 'bottom';
  const horizontal = 'right';

  const openSnackbar = (alertSeverity) => {
    setOpenSnack(true);
    setAlertSeverity(alertSeverity);
  };

  const closeSnackbar = () => {
    setOpenSnack(false);
  };
  const searchData = () => {
    if (symbolList) {
      console.log(symbolList.symbol)
      setLiveMarketData(marketLiveData)
      console.log(liveMarketData);

    } else {
      openSnackbar('warning');
    }
  }

  return (
    <Layout>
      <Seo title="Market Data" />
      <Typography
        component="h2"
        variant="h4"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, mb: 2 }}
      >
        {'Live Market Data'}
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
          >
            <Grid container spacing={3} item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1, mb: 1 }}
                >
                  {'Choose Symbol For Live Market Data'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={3}>
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="symbol"
                  options={symbols}
                  onChange={(event, newValue) => {
                    setSymbolList(newValue);
                  }}
                  renderInput={(params) => <TextField required {...params} label="Symbol" />}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={3}>
                <Button variant="contained" onClick={searchData}>Get Live Data</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {liveMarketData && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Favorite</TableCell>
                      <TableCell>Symbol</TableCell>
                      <TableCell>Short Name</TableCell>
                      <TableCell>Quote Type</TableCell>
                      <TableCell align="right">Regular Market Price</TableCell>
                      <TableCell align="right">Regular Market Change</TableCell>
                      <TableCell align="right">Regular Market Change Percent</TableCell>
                      <TableCell align="right">Regular Market Open</TableCell>
                      <TableCell align="right">Regular Market High</TableCell>
                      <TableCell align="right">Regular Market Low</TableCell>
                      <TableCell align="right">Regular Market Volume</TableCell>
                      <TableCell align="right">Fifty Day Average</TableCell>
                      <TableCell align="right">Fifty Day Average Change</TableCell>
                      <TableCell align="right">Fifty Day Average Change Percent</TableCell>
                      <TableCell align="right">Two Hundred Day Average</TableCell>
                      <TableCell align="right">Two Hundred Day Average Change</TableCell>
                      <TableCell align="right">Two Hundred Day Average Change Percent</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        <Checkbox className="favIcon" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {liveMarketData.result.symbol}
                      </TableCell>
                      <TableCell>{liveMarketData.result.shortName}</TableCell>
                      <TableCell>{liveMarketData.result.quoteType}</TableCell>
                      <TableCell>{liveMarketData.result.regularMarketPrice}</TableCell>
                      <TableCell>{liveMarketData.result.regularMarketChange}</TableCell>
                      <TableCell>{liveMarketData.result.regularMarketChangePercent}</TableCell>
                      <TableCell align="right">{liveMarketData.result.regularMarketOpen}</TableCell>
                      <TableCell align="right">{liveMarketData.result.regularMarketDayHigh}</TableCell>
                      <TableCell align="right">{liveMarketData.result.regularMarketDayLow}</TableCell>
                      <TableCell align="right">{liveMarketData.result.regularMarketVolume}</TableCell>
                      <TableCell align="right">{liveMarketData.result.fiftyDayAverage}</TableCell>
                      <TableCell align="right">{liveMarketData.result.fiftyDayAverageChange}</TableCell>
                      <TableCell align="right">{liveMarketData.result.fiftyDayAverageChangePercent}</TableCell>
                      <TableCell align="right">{liveMarketData.result.twoHundredDayAverage}</TableCell>
                      <TableCell align="right">{liveMarketData.result.twoHundredDayAverageChange}</TableCell>
                      <TableCell align="right">{liveMarketData.result.twoHundredDayAverageChangePercent}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
      <Snackbar open={openSnack} autoHideDuration={5000} onClose={closeSnackbar} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
        <Alert onClose={closeSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          {'Please enter required fields'}
        </Alert>
      </Snackbar>
    </Layout>
  )
}

export default MarketData
