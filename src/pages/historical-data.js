import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import EnhancedTable from "../components/table"
// import marketData from "../marketData"
import httpService from "../services/httpService"
import { getDataFromRapidAPI } from "../services/invokeFunctionService";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const headCells = [
  {
    id: 'date',
    numeric: false,
    label: 'Date',
  },
  {
    id: 'open',
    numeric: true,
    label: 'Open',
  },
  {
    id: 'high',
    numeric: true,
    label: 'High',
  },
  {
    id: 'low',
    numeric: true,
    label: 'Low',
  },
  {
    id: 'close',
    numeric: true,
    label: 'Close Price',
  },
  {
    id: 'volume',
    numeric: true,
    label: 'Volume',
  },
  {
    id: 'adjClose',
    numeric: true,
    label: 'Adjusted Closing Price',
  },
];


// const symbols = [
//   { label: 'TECHM.NS', symbol: 'TECHM.NS' },
//   { label: 'MARUTI.NS', symbol: 'MARUTI.NS' },
//   { label: 'ONGC.NS', symbol: 'ONGC.NS' },
//   { label: 'ICICIBANK.NS', symbol: 'ICICIBANK.NS' },
//   { label: 'WIPRO.NS', symbol: 'WIPRO.NS' },
//   { label: 'ULTRACEMCO.NS', symbol: 'ULTRACEMCO.NS' },
//   { label: 'TITAN.NS', symbol: 'TITAN.NS' },
//   { label: 'SHREECEM.NS', symbol: 'SHREECEM.NS' }
// ]

const formatData = date => date.toISOString().slice(0, 10);

const HistoricalData = () => {

  const [symbolList, setSymbolList] = React.useState([]);
  const [selectedSymbol, setSelectedSymbol] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('');
  const [historicalMarketData, setHistoricalMarketData] = React.useState(null);

  const [tableToolbarHeader, setTableToolbarHeader] = React.useState('');

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
    if (selectedSymbol && startDate & endDate) {
      console.log(selectedSymbol.symbol)
      console.log(formatData(startDate))
      console.log(formatData(endDate))
      setTableToolbarHeader(`Symbol : ${selectedSymbol.symbol} | Date: From ${formatData(startDate)} To ${formatData(endDate)}`)
      
      // Get Data from RapidAPI
      selectedSymbol.config.params.StartDateInclusive = formatData(startDate);
      selectedSymbol.config.params.EndDateInclusive = formatData(endDate);

      const data = getDataFromRapidAPI(selectedSymbol.config);
      data.then((response) => {
        if(response.status === 200){
          console.log(response.data)
          setHistoricalMarketData(response.data);
          // setHistoricalMarketData(marketData);
        }
      });


    } else {
      openSnackbar('warning');
    }
  }

  
  React.useEffect(() => {
    httpService.get('get-history-symbols').then((response) => {
      if (response.status === 200) {
        const symbols = []
        response.data.forEach(function (data) {
          const parsedData = data.data.body;
          const symbolData = {
            label: parsedData.params.Symbol,
            symbol: parsedData.params.Symbol,
            config: parsedData
          }
          symbols.push(symbolData)
        });
        console.log(symbols)
        setSymbolList(symbols)
      }

    }).catch((e) => {
      console.log('An API error occurred', e);
    })
  }, []);

  return (
    <Layout>
      <Seo title="Historical Data" />
      <Typography
        component="h2"
        variant="h4"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, mb: 2 }}
      >
        {'Historical Market Data'}
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
                  {'Search Historical Market Data'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={3}>
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="symbol"
                  options={symbolList}
                  onChange={(event, newValue) => {
                    setSelectedSymbol(newValue);
                  }}
                  renderInput={(params) => <TextField required {...params} label="Symbol" />}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id="startDate"
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField required sx={{ width: '100%' }} {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={12} lg={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id="endDate"
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField required sx={{ width: '100%' }} {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={12} lg={3}>
                <Button variant="contained" onClick={searchData}>Search</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {historicalMarketData && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <EnhancedTable enableSelection={true} headCells={headCells} tableData={historicalMarketData} tableToolbarHeader={tableToolbarHeader} />
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

export default HistoricalData
