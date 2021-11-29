import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

export class BasicCard extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography data-id="card-header" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Word of the Day
                            </Typography>
                            <Typography data-id="card-main" variant="h5" component="div">
                                Automation
                            </Typography>
                            <Typography data-id="card-type" sx={{ mb: 1.5 }} color="text.secondary">
                                noun
                            </Typography>
                            <Typography data-id="card-overview" variant="body2">
                                Automate the execution of tests
                                <br />
                                {'"compares actual with expected"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button data-id="card-action" size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </ThemeProvider>
            </>
        );
    }
};
