import * as React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import theme from '../theme'

import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import { useMsal } from "@azure/msal-react";


const AuthenticatedLayout = ({ children, data }) => {
    const { accounts } = useMsal();

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header accounts={accounts} siteTitle={data?.title || `Title`} />
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
                        <main>{children}</main>
                        <Footer siteTitle={data?.title || `Title`} siteUrl={data?.siteUrl || ''} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}


AuthenticatedLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default AuthenticatedLayout
