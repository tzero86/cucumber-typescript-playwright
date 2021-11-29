import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export class BasicInputValues extends React.Component {

    render() {

        return (
            <>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="Testing"
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Disabled"
                            defaultValue="Talks"
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Read Only"
                            defaultValue="Hub"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                </Box>
            </>
        );
    }
};

