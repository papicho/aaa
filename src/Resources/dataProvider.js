import React from "react";
import ReactDOM from "react-dom";
import { Admin, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";


const httpClient = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: 'Bearer ' + localStorage.getItem('token')
    };
    console.log(localStorage.getItem('token'))
    return fetchUtils.fetchJson(url, options);
};


const dataProvider = jsonServerProvider(
  "https://findar-api-staging.herokuapp.com",httpClient
);

export default dataProvider;
