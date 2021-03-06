import * as React from 'react';
// import Link from '@mui/material/Link';
import { Link } from "gatsby"
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const FavCard = ({ data, checkIsFav, favChange }) => {
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {data.symbol}
                <Checkbox
                    checked={checkIsFav(data.symbol)}
                    className="favIcon"
                    icon={<FavoriteBorder />}
                    onChange={(event) => favChange(event, data.symbol)}
                    checkedIcon={<Favorite />}
                />
            </Typography>
            <Typography component="p" variant="h4">
                {data.regularMarketPrice}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1, mt: 2 }}>
                {/* {'INR - EQUITY'} */}
                {data.regularMarketChangePercent > 0 ? (<ArrowUpwardIcon color={'success'} />) : (<ArrowDownwardIcon color={'error'} />)}
                {data.regularMarketChangePercent + ' %'}
            </Typography>
            <div>
                <Link color="primary" to="/market-data">
                    {'View Full Detail'}
                </Link>
            </div>
        </React.Fragment>
    );
}

export default FavCard