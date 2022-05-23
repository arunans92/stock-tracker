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

// import userDetails from "../userDetails"
import UnAuthenticatedLayout from "./unAuthenticatedLayout"
import httpService from "../services/httpService"
import sessionData from "../utils/sessionHanding"

const AuthenticatedLayout = ({ children, data }) => {
    const { accounts } = useMsal();
    // const [userList, setUserList] = React.useState([]);
    const [isValidUser, setIsValidUser] = React.useState(false);
    const [validUserList, setValidUserList] = React.useState([]);

    React.useEffect(() => {
        const users = sessionData.getUser();
        if (!users) {
            httpService.get('user-info').then((response) => {
                if (response.status === 200) {
                    const users = [];
                    response.data.forEach(function (data) {
                        users.push(data.data.body)
                    });
                    // console.log(users)
                    // setUserList(users)
                    checkUserIsValid(users, accounts)
                }
            }).catch((e) => {
                console.log('An API error occurred', e);
            })
        } else {
            checkUserIsValid(users, accounts)
        }
    }, [accounts]);

    const checkUserIsValid = (users, accounts) => {
        if (accounts && accounts[0]) {
            let uList = users.filter(user => user.username === accounts[0].username);
            if (uList && uList.length > 0) {
                setIsValidUser(true)
                setValidUserList(uList)
                sessionData.setUsers(uList)
            }
        }
    }

    return isValidUser ? (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header systemAccount={validUserList[0]} accounts={accounts} siteTitle={data?.title || `Title`} />
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
    ) : (
            <UnAuthenticatedLayout data={data} isInvalidUser={!isValidUser} />
        )
}


AuthenticatedLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default AuthenticatedLayout
