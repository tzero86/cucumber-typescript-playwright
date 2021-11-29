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

const openInNewTab = (url) => {
    const newWindow = window.open(url, "myWin", "width=1200, height=600, top=100, left=100, scrollbars=yes, resizable=yes");
    if (newWindow) newWindow.opener = null
}

export class BasicOpenWindow extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Stack direction="row" spacing={2}>
                        <Button data-id="open-window-button" onClick={() => openInNewTab('/')} variant="outlined">Open Window</Button>
                    </Stack>
                </ThemeProvider>
            </>
        );
    }
};

