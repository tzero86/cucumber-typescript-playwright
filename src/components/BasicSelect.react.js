import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

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

export class BasicSelect extends React.Component {

    render() {

        return (
            <>
                <ThemeProvider theme={theme}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Age
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                inputProps={{
                                    name: 'age',
                                    "data-id=" : 'basic-select',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </ThemeProvider>
            </>
        );
    }
};
