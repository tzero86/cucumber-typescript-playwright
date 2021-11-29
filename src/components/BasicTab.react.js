import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Link from '@mui/material/Link';

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

export class BasicTab extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Link data-id="new-tab-button" target="_blank" href="/">Link</Link>
                </ThemeProvider>
            </>
        );
    }
};

