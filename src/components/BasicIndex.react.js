import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material';
import { purple } from '@mui/material/colors';


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


export class BasicIndex extends React.Component {

    render() {

        return (
            <>
                <ThemeProvider theme={theme}>
                    <Stack direction="row" spacing={2}>
                        <Button data-id="my-button" variant="outlined">One</Button>
                        <Button data-id="my-button" variant="outlined">Two</Button>
                        <Button data-id="my-button" variant="outlined">Three</Button>
                    </Stack>
                </ThemeProvider>
            </>
        );
    }
};

