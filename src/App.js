import React from "react";
import ReactDOM from "react-dom";
import { Admin } from "react-admin";

import * as Resources from "./Resources";
import authProvider from './Resources/authProvider';
import dataProviderWrapper from './Resources/dataProviderWrapper';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

const myTheme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    overrides: {
        MuiButton: { // override the styles of all instances of this component
            root: { // Name of the rule
                color: 'white', // Some CSS
            },
        },
    },
});

const App = () => (
  <Admin theme={myTheme} authProvider={authProvider} dataProvider={dataProviderWrapper}>
    {Resources.Checkpoints.resource}
    {Resources.Users.resource}
  </Admin>
);

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
