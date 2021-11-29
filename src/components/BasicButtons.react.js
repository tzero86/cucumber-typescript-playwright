import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
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

export class BasicButtons extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Stack direction="row" spacing={2}>
                        <Button data-id="primary-button" variant="outlined">Primary</Button>
                        <Button data-id="secondary-button" variant="outlined" disabled>
                            Disabled
                        </Button>
                        <Button data-id="third-button" variant="outlined" href="#outlined-buttons">
                            Link
                        </Button>
                    </Stack>
                </ThemeProvider>
            </>
        );
    }
};

