import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import cameron from "../assets/css/images/cam.jpeg"
import testingtalks from "../assets/css/images/testing-talks.png"

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

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

export class BasicAvatars extends React.Component {

    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Stack direction="row" spacing={2}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <a data-id="avatar" rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/cambradley/"><Avatar alt="Cameron Bradley" src={cameron} /></a>
                        </StyledBadge>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <SmallAvatar data-id="small-avatar" alt="Remy Sharp" src={testingtalks} />
                            }
                        >
                            <a data-id="avatar" rel="noopener noreferrer" target="_blank" href="https://www.testingtalks.com.au/"><Avatar alt="Testing Talks" src={testingtalks} /></a>
                        </Badge>
                    </Stack>
                </ThemeProvider>
            </>
        );
    }
};

