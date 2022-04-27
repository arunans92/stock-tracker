
import * as React from "react"
import PropTypes from "prop-types"
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = ({ siteTitle, siteUrl }) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }} >
            {'Copyright © '}
            <Link color="inherit" href={siteUrl}>
                {siteTitle}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

Footer.propTypes = {
    siteTitle: PropTypes.string,
}

Footer.defaultProps = {
    siteTitle: ``,
}

export default Footer