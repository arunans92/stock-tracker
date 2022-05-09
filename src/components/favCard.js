import * as React from 'react';
// import Link from '@mui/material/Link';
import { Link } from "gatsby"
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const FavCard = ({ data }) => {
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {data.symbol}
                <Checkbox checked={true} className="favIcon" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            </Typography>
            <Typography component="p" variant="h4">
                {data.price}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1, mt: 2 }}>
                {/* {'INR - EQUITY'} */}
                {data.changePercent > 0 ? (<ArrowUpwardIcon color={'success'} />) : (<ArrowDownwardIcon color={'error'} />)}
                {data.changePercent + ' %'}
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