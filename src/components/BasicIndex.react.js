import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export class BasicIndex extends React.Component {

    render() {

        return (
            <>
                <Stack direction="row" spacing={2}>
                    <Button data-id="my-button" variant="outlined">One</Button>
                    <Button data-id="my-button" variant="outlined">Two</Button>
                    <Button data-id="my-button" variant="outlined">Three</Button>
                </Stack>
            </>
        );
    }
};

