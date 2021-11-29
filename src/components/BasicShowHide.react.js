import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
export class BasicShowHide extends React.Component {
    state = { showing: true };

    render() {
        const { showing } = this.state;
        return (
            <>
                <ThemeProvider theme={theme}>
                        <Stack direction="row" spacing={2}>
                            <div>
                            <Button data-id="show-hide-button" variant="outlined" onClick={() => this.setState({ showing: !showing })}>Toggle Visibility</Button>
                                { showing
                                    ? <div data-id="show-hide-text">This is visible</div>
                                    : null
                                }
                            </div>
                        </Stack>
                </ThemeProvider>
            </>
        );
    }
};

