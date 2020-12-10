import { fetchUtils } from "react-admin";
import dataProvider from './dataProvider';
import { stringify } from "query-string";

let apiUrl = "";
  apiUrl = "https://findar-api-staging.herokuapp.com";

  function removeAllElements(array, elem) {
      var index = array.indexOf(elem);
      while (index > -1) {
          array.splice(index, 1);
          index = array.indexOf(elem);
      }
  }

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProviderWrapper = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      _limit: 100,
      _page: page,
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1])
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const newData = []
    let ttl = 0
    if (query._page === 1)
    {
    let rep = httpClient(url)
    .then(function({headers, json}){
      json.map(function(record){
        let tmpData = {}
        if (resource === "checkpoint")
        {
        let tmp = record.location.school.toLowerCase()

        if (tmp)
        {
          const loginSchool = localStorage.getItem('school')
          let n = tmp.includes(loginSchool);
            //console.log("dans  NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
            //console.log(tmp)
            if (n)
            {
              let voisins = []
              for (const [key, value] of Object.entries(record.neighbors))
              {
                //console.log(`${parseInt(key)+1}: ${Object.entries(value)}`);
                //console.log(`${Object.entries(value)}`);
                let mouk = `${Object.entries(value)}.`
                voisins.push(mouk)

              }

              tmpData = {
                id: record._id,
                name: record.name,
                QRCode: "frame.png",
                building: record.building,
                checkpointType: record.checkpointType,
                floor: record.floor,
                neighbors: voisins,
                school: record.location.school,
                country: record.location.country,
                city: record.location.city
                        }
              newData.push(tmpData);
                      }
            }
        }
        else if (resource === "user")
        {
          let email = localStorage.getItem("username")
          var name   = email.substring(0, email.lastIndexOf("@"));
          var domain = email.substring(email.lastIndexOf("@") +1);
          let fullname = name.split(".")
          let fn = fullname[0]
          let ln = fullname[1]
          let loginSchool0 = domain.split(".")
          let loginSchool = loginSchool0[0]


          let email2 = record.email
          var name2   = email2.substring(0, email2.lastIndexOf("@"));
          var domain2 = email2.substring(email2.lastIndexOf("@") +1);
          let fullname2 = name2.split(".")
          let fn2 = fullname2[0]
          let ln2 = fullname2[1]
          let loginSchool02 = domain2.split(".")
          let loginSchool2 = loginSchool02[0]
          let tmp = loginSchool2
          if (tmp)
          {
            tmp = tmp.toLowerCase()
              let n = tmp.includes(loginSchool);


                if (n)
                {
                  tmpData = {
                    id: record._id,
                    email: record.email,
                    userPicture: record.userPicture,
                    school: record.school,
                    role: record.role
                  }
                  newData.push(tmpData);
                }
          }
        }
      })
      if (resource === "user"){
        localStorage.setItem('ttlU', newData.length)
        //localStorage.setItem('newData', newData)
      }
      else {
        localStorage.setItem('ttlC', newData.length)
      }



      console.log('ttl: '+ localStorage.getItem('ttl'));
      console.log("query: " + JSON.stringify(query));
      console.log("Resource: " + resource);
        //return {
        //data: newData,
        //total: newData.length
      //}
    });}


    const query2 = {
      ...fetchUtils.flattenObject(params.filter),
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      _limit: perPage,
      _page: page,
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1])
    };
    const url2 = `${apiUrl}/${resource}?${stringify(query2)}`;
    const newData2 = []
    let ttl2 = 0
    let rep2 = httpClient(url2)
    .then(function({headers, json}){
      json.map(function(record){
        let tmpData = {}
        if (resource === "checkpoint")
        {
        let tmp = record.location.school.toLowerCase()

        if (tmp)
        {
          const loginSchool = localStorage.getItem('school')
          let n = tmp.includes(loginSchool);
            //console.log("dans  NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
            //console.log(tmp)
            if (n)
            {
              let voisins = []
              for (const [key, value] of Object.entries(record.neighbors))
              {
                //console.log(`${parseInt(key)+1}: ${Object.entries(value)}`);
                //console.log(`${Object.entries(value)}`);
                let mouk = `${Object.entries(value)}.`
                voisins.push(mouk)

              }

              tmpData = { ...record, id: record._id }
              newData2.push(tmpData);
                      }
            }
        }
        else if (resource === "user")
        {
          let email = localStorage.getItem("username")
          var name   = email.substring(0, email.lastIndexOf("@"));
          var domain = email.substring(email.lastIndexOf("@") +1);
          let fullname = name.split(".")
          let fn = fullname[0]
          let ln = fullname[1]
          let loginSchool0 = domain.split(".")
          let loginSchool = loginSchool0[0]


          let email2 = record.email
          var name2   = email2.substring(0, email2.lastIndexOf("@"));
          var domain2 = email2.substring(email2.lastIndexOf("@") +1);
          let fullname2 = name2.split(".")
          let fn2 = fullname2[0]
          let ln2 = fullname2[1]
          let loginSchool02 = domain2.split(".")
          let loginSchool2 = loginSchool02[0]
          let tmp = loginSchool2
          if (tmp)
          {
            tmp = tmp.toLowerCase()
              let n = tmp.includes(loginSchool);


                if (n)
                {
                  tmpData = {
                    id: record._id,
                    email: record.email,
                    userPicture: record.userPicture,
                    school: record.school,
                    role: record.role
                  }
                  newData2.push(tmpData);
                }
          }
        }
      })
      if (resource === "user")
      {
        return {
          data: newData2,
          total: Number(localStorage.getItem('ttlU'))
        }
      }
      else
      {
        return {
          data: newData2,
          total: Number(localStorage.getItem('ttlC'))
        }
      }
    });


    return rep2
  },
  getMany: (resource, params) => dataProvider.getMany(resource, params),
  updateMany: (resource, params) => dataProvider.updateMany(resource, params),
  create: (resource, params) => {
    if (resource === "checkpoint")
 {
    //if (params.hasOwnProperty('location')) {console.log("OUAIS ELLE LA LOCATION!!!")}
      //console.log("sa rentre dans create check point avec les params suivant")
      //console.log(params)

   //console.log("jessaie de creer un checkpoint et mes params sont :")
   //console.log(JSON.stringify(params, null, 8))

 }
 else if (resource === "user")
{
  resource = resource + "/signup"
}
    //console.log("param de create :");
    //console.log(params);
    return dataProvider.create(resource, params)
  },
  delete: (resource, params) => dataProvider.delete(resource, params),
  deleteMany: (resource, params) => dataProvider.deleteMany(resource, params),







      getManyReference: (resource, params) => {
          const { page, perPage } = params.pagination;
          const { field, order } = params.sort;
          console.log("sa rentre dans getmanyref")
          const query = {
              sort: JSON.stringify([field, order]),
              range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
              filter: JSON.stringify({
                  ...params.filter,
                  [params.target]: params.id,
              }),
          };
          const apiUrl = "https://findar-api-staging.herokuapp.com"
          const url = `${apiUrl}/${resource}?${query}`;
          //const url = `${apiUrl}/${resource}?floor=2`;

          return dataProvider.httpClient(url).then(({ headers, json }) => ({
              zebi: json,
              total: parseInt(headers.get('content-range').split('/').pop(), 10)
          }));
      },
      getOne: (resource, params) => {
      if (resource === "user") {
        return httpClient(`${apiUrl}/${resource}/profile/${params.id}`).then(
          ({ json }) => ({
            data: { ...json, id: json._id }
          })
        );
      }
      return httpClient(`${apiUrl}/${resource}/${params.id}`).then(
        ({ json }) => ({
          data: { ...json, id: json._id }
        })
      );
    },
  update: (resource, params) => {
    console.log("SA REEEENTRE DANS UPDATE")
    console.log("les params sont ")
    console.log(params)
    console.log("Data provided by react-admin to data provider:");
    console.log(JSON.stringify(params, null, 8));

    if (resource === "user")
    {
      resource = resource + "/profile"




      let tmp
      let oui = 0
  for (const [key, value] of Object.entries(params["data"])) {
    tmp = `${key}: ${value}`;
    if (tmp.includes("userPicture") || tmp.includes("rawFile"))
    {
      oui = oui + 1
      console.log("OUI YA UNE PHOTO A UPDATE et resource =")
      console.log(params);
    }
    else {
      console.log("pas de photo a upload")
    }
  }
  const convertFileToBase64 = file =>
      new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;

          reader.readAsDataURL(file.rawFile);
      });
      let paramsArr
      paramsArr = Object.entries(params.data.userPicture)
      console.log("PARAMSARR0");
      if (oui === 2)
      {
        console.log("OUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUI JE DOIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIS");
        console.log(paramsArr[0]);
        // Freshly dropped pictures are File objects and must be converted to base64 strings
       const newPictures = paramsArr.filter(
           p => p.rawFile instanceof File,
       );
       console.log("LE PPPPPPPPPPPPPPPPPPPPPPPPPP");
       console.log(newPictures)

       const formerPictures = paramsArr.filter(
           p => !(p.rawFile instanceof File)
       );
       console.log("paramsArr")
       console.log(paramsArr)

       var formdata = new FormData();
       formdata.append("userPicture", paramsArr[0][1], paramsArr[2][1]);

       return Promise.all(newPictures.map(convertFileToBase64))
           .then(base64Pictures =>
               base64Pictures.map(picture64 => ({
                   src: picture64,
                   title: `${params.data.title}`,
               }))
           )
           .then(transformedNewPictures =>
             fetch(`https://findar-api-staging.herokuapp.com/${resource}/${params.id.toString()+"/image"}`, { method: 'POST',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              },
               body:formdata
            })
           );
      }
      else {
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(params.data)
        }).then(({ json }) => ({ data: { ...json, id: json._id } }));
      }
    }
    else {
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(params.data)
      }).then(({ json }) => ({ data: { ...json, id: json._id } }));
    }
  }
};

export default dataProviderWrapper;
