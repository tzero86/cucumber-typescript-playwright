import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
export class BasicValidation extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                error
                                data-id="validation-input-two"
                                id="outlined-error-helper-text"
                                label="Error"
                                defaultValue="Testing Talks Online"
                                helperText="Incorrect entry."
                            />
                        </div>
                    </Box>
                </ThemeProvider>
            </>
        );
    }
};

