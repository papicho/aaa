import React from "react";
import ReactDOM from "react-dom";
import { Admin, TextField, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import * as Resources from "./Resources";
import authProvider from './Resources/authProvider';
import dataProvider from './Resources/dataProvider';
import dataProviderWrapper from './Resources/dataProviderWrapper';
import Typography from '@material-ui/core/Typography';

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProviderWrapper}>
    {Resources.Checkpoints.resource}
    {Resources.Users.resource}
  </Admin>
);

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
