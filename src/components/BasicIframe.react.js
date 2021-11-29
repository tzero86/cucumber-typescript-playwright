import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Iframe from 'react-iframe'

const theme = createTheme({
    inputRoot: {
        color: "blue",
        backgroundColor: "#f2f2f2"
    },
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: purple[500],
        },
        secondary: {
            // This is green.A700 as hex.
            main: purple[500],
        },
    },
});
export class BasicIframe extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Iframe url="/"
                            width="350px"
                            height="450px"
                            id="basic-iframe"
                            className="myClassname"
                            display="initial"
                            position="relative"/>
                </ThemeProvider>
            </>
        );
    }
};

