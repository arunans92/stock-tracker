import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { getDataFromRapidAPI } from "../services/invokeFunctionService";
import faunadbApi from "../services/faunadbApi"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const orderBy = [
  { label: 'Ascending', order: 'Ascending' },
  { label: 'Descending', order: 'Descending' }
];

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

const endPoints = [
  { endPoint: 'stock-prices', label: 'Historic Stock Prices', isDateReq: true, isOrderByReq: true },
  { endPoint: 'stock-metadata', label: 'Live Stock Statistics', isDateReq: false, isOrderByReq: false }
]

const apiActions = [
  { action: 'GET', label: 'Get' },
  { action: 'POST', label: 'Post' }
]

const urlList = [
  {
    url: 'https://yahoofinance-stocks1.p.rapidapi.com',
    label: 'Yahoo Finance Stocks',
    headers: {
      'X-RapidAPI-Host': 'yahoofinance-stocks1.p.rapidapi.com',
      'X-RapidAPI-Key': 'd34dc8b7e3msh8b556c365c2e971p14a8b0jsnf88536e94ae6'
    }
  }
]
const defaultApiPayload = {
  method: '',
  url: '',
  params: {},
  headers: {}
};

const formatData = date => date.toISOString().slice(0, 10);

const PricingConfig = () => {

  const [apiUrl, setApiUrl] = React.useState('');
  const [apiEndPoint, setApiEndPoint] = React.useState('');
  const [apiAction, setApiAction] = React.useState('');
  const [apiSymbol, setApiSymbol] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [apiOrderBy, setApiOrderBy] = React.useState('');
  const [apiPayload, setApiPayload] = React.useState(defaultApiPayload);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('');

  const vertical = 'bottom';
  const horizontal = 'right';

  const openSnackbar = (alertSeverity) => {
    setOpenSnack(true);
    setAlertSeverity(alertSeverity);
  };

  const closeSnackbar = () => {
    setOpenSnack(false);
  };

  const inputOnchange = (event, inputType, value) => {
    if (event && inputType && value) {
      const currentPayload = { ...apiPayload };
      switch (inputType) {
        case 'apiUrl':
          currentPayload.url = value.url + (apiEndPoint ? '/' + apiEndPoint.endPoint : '');
          currentPayload.headers = value.headers;
          break;
        case 'endPoint':
          delete currentPayload.params.StartDateInclusive;
          delete currentPayload.params.EndDateInclusive;
          delete currentPayload.params.OrderBy;
          setStartDate(null);
          setEndDate(null);
          setApiOrderBy(null);
          currentPayload.url = (apiUrl ? apiUrl.url : '') + '/' + value.endPoint;
          break;
        case 'action':
          currentPayload.method = value.action;
          break;
        case 'apiHeader':
          currentPayload.headers = value.headers
          break;
        case 'symbol':
          currentPayload.params.Symbol = value.symbol
          break;
        case 'startDate':
          currentPayload.params.StartDateInclusive = formatData(value)
          break;
        case 'endDate':
          currentPayload.params.EndDateInclusive = formatData(value)
          break;
        case 'orderBy':
          currentPayload.params.OrderBy = value.order
          break;
        default:
          break;
      }
      setApiPayload({ ...currentPayload });
      // console.log(apiPayload);
    }
  }

  const submitApiConfig = () => {
    if (apiUrl && apiEndPoint && apiAction && apiSymbol) {
      if (apiEndPoint.isDateReq && (!startDate || !endDate)) {
        openSnackbar('error');
      } else {
        console.log(apiPayload);

        // Get Data from RapidAPI

        // const data = getDataFromRapidAPI(apiPayload);
        // data.then((response) => {
        //   console.log(response)
        // });

        // Make API request to post data to fuanaDb

        faunadbApi.create(apiPayload).then((response) => {
          console.log(response);
        }).catch((e) => {
          console.log('An API error occurred', e);
        })

        openSnackbar('success');
      }
    } else {
      openSnackbar('error');
    }
  }

  return (
    <Layout>
      <Seo title="Pricing Configuration" />
      <Typography
        component="h2"
        variant="h4"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, mb: 2 }}
      >
        Pricing Configuration
    </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={4}>
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
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="apiUrl"
                  options={urlList}
                  onChange={(event, newValue) => {
                    setApiUrl(newValue);
                    inputOnchange(event, 'apiUrl', newValue);
                  }}
                  renderInput={(params) => <TextField required {...params} label="API URL" />}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="endPoint"
                  options={endPoints}
                  onChange={(event, newValue) => {
                    setApiEndPoint(newValue);
                    inputOnchange(event, 'endPoint', newValue);
                  }}
                  renderInput={(params) => <TextField required {...params} label="End Point" />}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="action"
                  options={apiActions}
                  onChange={(event, newValue) => {
                    setApiAction(newValue)
                    inputOnchange(event, 'action', newValue);
                  }}
                  renderInput={(params) => <TextField required {...params} label="Action" />}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  required
                  sx={{ width: '100%' }}
                  id="apiHeader"
                  label="Header"
                  multiline
                  value={JSON.stringify(apiPayload.headers, null, 4)}
                  rows={4}
                  onChange={(event, newValue) => {
                    inputOnchange(event, 'apiHeader', newValue);
                  }}
                  placeholder="API Header"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
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
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="symbol"
                  options={symbols}
                  onChange={(event, newValue) => {
                    setApiSymbol(newValue);
                    inputOnchange(event, 'symbol', newValue);
                  }}
                  renderInput={(params) => <TextField required {...params} label="Symbol" />}
                />
              </Grid>
              {apiEndPoint && apiEndPoint.isDateReq && (
                <>
                  <Grid item xs={12} md={12} lg={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        id="startDate"
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                          inputOnchange(true, 'startDate', newValue);
                        }}
                        renderInput={(params) => <TextField required sx={{ width: '100%' }} {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        id="endDate"
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => {
                          setEndDate(newValue);
                          inputOnchange(true, 'endDate', newValue);
                        }}
                        renderInput={(params) => <TextField required sx={{ width: '100%' }} {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </>
              )}
              {apiEndPoint && apiEndPoint.isOrderByReq && (
                <>
                  <Grid item xs={12} md={12} lg={12}>
                    <Autocomplete
                      autoHighlight
                      disablePortal
                      id="orderBy"
                      options={orderBy}
                      value={apiOrderBy ? apiOrderBy.order : ''}
                      onChange={(event, newValue) => {
                        setApiOrderBy(newValue)
                        inputOnchange(event, 'orderBy', newValue);
                      }}
                      renderInput={(params) => <TextField {...params} label="Order By" />}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
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
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  API Configuration Preview
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <pre className="pre">
                  <code>
                    {JSON.stringify(apiPayload, null, 4)}
                  </code>
                </pre>
              </Grid>
              <Grid item xs={12} md={12} lg={12} textAlign="right" alignSelf="flex-end">
                <Button variant="contained" onClick={submitApiConfig}>Submit</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Snackbar open={openSnack} autoHideDuration={5000} onClose={closeSnackbar} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
          <Alert onClose={closeSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertSeverity === 'error' ? 'Please enter required fields' : 'Config saved successfully'}
          </Alert>
        </Snackbar>
      </Grid>
    </Layout>
  )
}

export default PricingConfig
