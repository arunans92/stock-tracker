import * as React from "react"
import { ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import theme from '../theme'

import Header from "./header"
import Footer from "./footer"
import "./layout.css"


const UnAuthenticatedLayout = ({ isInvalidUser, data }) => {
    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header siteTitle={data?.title || `Title`} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>

                        <Typography
                            component="h2"
                            variant="h6"
                            color="inherit"
                            noWrap
                            align="center"
                            sx={{ flexGrow: 1, pt: 4 }}
                        >
                            {isInvalidUser ? 'User is not part of Stock Tracker Application' : 'Please Login to use Stock Tracker Application'}
                        </Typography>
                        <Footer siteTitle={data?.title || `Title`} siteUrl={data?.siteUrl || ''} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default UnAuthenticatedLayout
