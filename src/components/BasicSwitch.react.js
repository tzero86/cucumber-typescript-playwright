import React from 'react';

import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
export class BasicSwitch extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked inputProps={{ "data-id":"switch-one" }} />} label="Enabled" />
                        <FormControlLabel disabled control={<Switch inputProps={{ "data-id":"switch-two" }} />} label="Disabled" />
                    </FormGroup>
                </ThemeProvider>
            </>
        );
    }
};

