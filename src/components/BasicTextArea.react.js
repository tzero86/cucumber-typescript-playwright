import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import TextareaAutosize from '@mui/material/TextareaAutosize';

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

export class BasicTextArea extends React.Component {

    render() {

        return (
            <>
                <ThemeProvider theme={theme}>
                    <TextareaAutosize
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        data-id="textarea"
                        defaultValue="Testing Talks Hub has been established to teach the community how to build world class automation frameworks using the latest tooling."
                        style={{ width: 200 }}
                    />
                </ThemeProvider>
            </>
        );
    }
};

