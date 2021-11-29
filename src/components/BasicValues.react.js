import React from 'react';
import Stack from '@mui/material/Stack';


export class BasicValues extends React.Component {

    render() {

        return (
            <>
                <Stack direction="row" spacing={2}>
                    <p data-id="value-one" variant="outlined">599523</p>
                    <p data-id="value-two" variant="outlined">44422122</p>
                    <p data-id="value-three" variant="outlined">51233322</p>
                </Stack>
            </>
        );
    }
};

