import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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
export class BasicAlert extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert data-id="error-alert" severity="error">This is an error alert — check it out!</Alert>
                        <Alert data-id="warning-alert" severity="warning">This is a warning alert — check it out!</Alert>
                        <Alert data-id="info-alert" severity="info">This is an info alert — check it out!</Alert>
                        <Alert data-id="success-alert" severity="success">This is a success alert — check it out!</Alert>
                    </Stack>
                </ThemeProvider>
            </>
        );
    }
};

