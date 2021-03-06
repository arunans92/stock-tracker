import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import FavCard from "../components/favCard"

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import httpService from "../services/httpService";
import sessionHanding from "../utils/sessionHanding";
import { getDataFromRapidAPI } from "../services/invokeFunctionService";

// const favData = [
//   { price: 1261.15, changePercent: -2.2932384, symbol: 'TECHM.NS' },
//   { price: 1261.15, changePercent: 2.2932384, symbol: 'MARUTI.NS' },
//   { price: 1261.15, changePercent: 2.2932384, symbol: 'ONGC.NS' },
//   { price: 1261.15, changePercent: -2.2932384, symbol: 'ICICIBANK.NS' }
// ]

const Favorites = () => {

  const [favSymbolList, setFavSymbolList] = React.useState([]);
  const [symbolConfigList, setSymbolConfigList] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState([]);


  
  const favChange = (event, symbol) => {
    const user = userInfo[0];
    console.log(event.target.checked);
    console.log(symbol);

    if (user.preferences.favorites.indexOf(symbol) >= 0) {
      user.preferences.favorites.splice(user.preferences.favorites.indexOf(symbol), 1)
    } else {
      user.preferences.favorites = [...user.preferences.favorites, symbol];
    }
    console.log(user);
    sessionHanding.setUsers([user]);
    setUserInfo([user]);
    
    httpService.update(user).then((response) => {
      console.log(response)
    })
  };

  const checkIsFav = (symbol) => {
    const user = userInfo[0];
    let isFav = false;
    if (user && user.preferences.favorites.indexOf(symbol) >= 0) {
      isFav = true;
    }
    return isFav;
  }

  React.useEffect(() => {
    httpService.get('get-live-symbols').then((response) => {
      if (response.status === 200) {
        const symbols = [];
        response.data.forEach(function (data) {
          const parsedData = data.data.body;
          const users = sessionHanding.getUser();
          setUserInfo(users);
          if (users) {
            users.forEach(function (user) {
              if (user.preferences.favorites.indexOf(parsedData.params.Symbol) >= 0) {
                symbols.push(parsedData)
              }
            })
          }
        });
        console.log(symbols);
        setSymbolConfigList(symbols);
        const marketData = [];
        symbols.forEach(function (req, index) {
          setTimeout(function () {
            // Get Data from RapidAPI
            const apiData = getDataFromRapidAPI(req);
            apiData.then((response) => {
              console.log(response)
              if (response.status === 200) {
                marketData.push(response.data.result);
                setFavSymbolList([...marketData]);
                console.log(marketData);
              }
            });
            // marketData.push({ regularMarketPrice: 1261.15, regularMarketChangePercent: -2.2932384, symbol: 'TECHM.NS' + index });
            // console.log(marketData);
            // setFavSymbolList([...marketData]);
          }, index * 2000);
        })
      }

    }).catch((e) => {
      console.log('An API error occurred', e);
    })
  }, []);

  return (
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
        {symbolConfigList.length === favSymbolList.length && favSymbolList.map((data) => (
          <Grid item xs={12} md={4} lg={3} key={data.symbol}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <FavCard data={data} checkIsFav={checkIsFav} favChange={favChange} />
            </Paper>
          </Grid>
        ))}
        {symbolConfigList.length !== favSymbolList.length && symbolConfigList.map(() => (
          <Grid item xs={12} md={4} lg={3} key={Math.random()}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Stack spacing={1}>
                <Skeleton variant="rectangular" height={118} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default Favorites
