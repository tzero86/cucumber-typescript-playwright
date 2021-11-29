import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

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

export class BasicMenu extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button data-id="drop-down-button" variant="contained" {...bindTrigger(popupState)}>
                                    Drop Down Menu
                                </Button>
                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem data-id="drop-down-profile" onClick={popupState.close}>Profile</MenuItem>
                                    <MenuItem data-id="drop-down-my-account" onClick={popupState.close}>My account</MenuItem>
                                    <MenuItem data-id="drop-down-logout" onClick={popupState.close}>Logout</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </ThemeProvider>
            </>
        );
    }
};

