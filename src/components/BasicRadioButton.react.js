import React from 'react';

import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {purple} from "@mui/material/colors";

const theme = createTheme({
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

export class BasicRadioButton extends React.Component {

render() {
return (
<>
<ThemeProvider theme={theme}>
 <div class="radio-button-playground">
 <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel data-id="female-radio-button" value="female" control={<Radio />} label="Female" />
        <FormControlLabel data-id="male-radio-button" value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
    </div>
</ThemeProvider>
    </>
    );
};


};