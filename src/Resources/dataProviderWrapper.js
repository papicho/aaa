import React from "react";
import ReactDOM from "react-dom";
import { Admin, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import dataProvider from './dataProvider';


const dataProviderWrapper = {
  getList: (resource, params) => {
    console.log(resource)
    console.log("PARAMS ARE : ")
    console.log(params)
    if (resource == "checkpoint")
    {
        return dataProvider.getList(resource, params).then(result => {
          /**
           * filtering data to only return only certain fields
           * imagine I have a custom data provider that runs on top of graphql
           * and only returns certain fields in getList
           */
          const newData = [];
          result.data.forEach(record => {
            newData.push({
              id: record._id,
              name: record.name,
              building: record.building,
              checkpointType: record.checkpointType,
              floor: record.floor,
              neighbors: record.neighbors,
              school: record.location.school,
              country: record.location.country,
              city: record.location.city
            });
          });
          console.log(`Data returned from data provider in getList:`);
          console.log(JSON.stringify(newData, null, 8));
          return { data: newData, total: newData.length };
        });
    }
    else if (resource == "user")
    {
        return dataProvider.getList(resource, params).then(result => {
          /**
           * filtering data to only return only certain fields
           * imagine I have a custom data provider that runs on top of graphql
           * and only returns certain fields in getList
           */
          const newData = [];
          result.data.forEach(record => {
            newData.push({
              id: record._id,
              email: record.email,
              school: record.school,
              role: record.role
            });
          });
          console.log("ressource =====")
          console.log(resource)
          console.log(`Data returned from data provider in getList:`);
          console.log(JSON.stringify(newData, null, 8));
          return { data: newData, total: newData.length };
        });
    }
  },
  getMany: (resource, params) => dataProvider.getMany(resource, params),
  updateMany: (resource, params) => dataProvider.updateMany(resource, params),
  create: (resource, params) => {
    console.log("param de create :");
    console.log(params);
    resource = resource + "/signup"
    return dataProvider.create(resource, params)
  },
  delete: (resource, params) => dataProvider.delete(resource, params),
  deleteMany: (resource, params) => dataProvider.deleteMany(resource, params),







      getManyReference: (resource, params) => {
          const { page, perPage } = params.pagination;
          const { field, order } = params.sort;
          const query = {
              sort: JSON.stringify([field, order]),
              range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
              filter: JSON.stringify({
                  ...params.filter,
                  [params.target]: params.id,
              }),
          };
          const apiUrl = "https://findar-api-staging.herokuapp.com"
          const url = `${apiUrl}/${resource}`;
          //const url = `${apiUrl}/${resource}?floor=2`;

          return dataProvider.httpClient(url).then(({ headers, json }) => ({
              zebi: json,
              total: parseInt(headers.get('content-range').split('/').pop(), 10),
          }));
      },
  getOne: (resource, params) => {
    console.log("LES PARAMETRE de GETONE SONT ")
    console.log(params)
    if (resource == "user" && params.hasOwnProperty('id') )
    {  resource = resource + "/profile"  }
    return dataProvider.getOne(resource, params).then(result => {
      const location = [];
      const newData = {
        id: result.data._id,
        email: result.data.email,
        school: result.data.school,
      };
      console.log(`Data returned from data provider in getoooooooooOne:`);
      console.log(JSON.stringify(newData, null, 8));
      return { data: newData };
    });
  },
  update: (resource, params) => {
    console.log("SA REEEENTRE")
    console.log("Data provided by react-admin to data provider:");
    console.log(JSON.stringify(params, null, 8));
    resource = resource + "/profile"
    return dataProvider.update(resource, params);
  }
};

export default dataProviderWrapper;
