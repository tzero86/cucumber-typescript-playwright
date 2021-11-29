import React from 'react';

import { Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, pink, blue } from '@mui/material/colors';
import label from '@mui/material/Autocomplete';


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
export class BasicCheckBox extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Checkbox inputProps={{ "data-id":"blue-radio-button" }}  {...label} sx={{
                        color: blue[800],
                        '&.Mui-checked': {
                            color: blue[600],
                        },
                    }} />
                    <Checkbox {...label} inputProps={{ "data-id":"purple-radio-button" }} color="secondary" />
                    <Checkbox {...label} inputProps={{ "data-id":"green-radio-button" }} color="success" />
                    <Checkbox {...label} inputProps={{ "data-id":"grey-radio-button" }} color="default" />
                    <Checkbox inputProps={{ "data-id":"red-radio-button" }}
                        {...label}
                        sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                                color: pink[600],
                            },
                        }}
                    />
                </ThemeProvider>
            </>
        );
    }
};

