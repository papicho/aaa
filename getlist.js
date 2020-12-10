getList: (resource, params) => {

  const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
    localStorage.setItem('query', query)
    console.log("Sa rentre dans getlist")














  //console.log("FN =")
  //console.log(localStorage.getItem('username'))
  //var emailUser = localStorage.getItem('username')
  //var userSchool = emailUser.split('.')
  //localStorage.setItem("fn", userSchool[0])
  //var schoolName = userSchool[1].split('@')
  //localStorage.setItem('schoolName', schoolName[1])
  //console.log(schoolName[1])
  console.log(resource)
  console.log("PARAMS ARE : ")
  console.log(params)
  if (resource === "checkpoint")
  {
      return dataProvider.getList(resource, params).then(result => {
        /**
         * filtering data to only return only certain fields
         * imagine I have a custom data provider that runs on top of graphql
         * and only returns certain fields in getList
         */
        const newData = [];
        result.data.forEach(record => {
          //console.log("record location school :")
          let email = localStorage.getItem("username")
          var name   = email.substring(0, email.lastIndexOf("@"));
          var domain = email.substring(email.lastIndexOf("@") +1);
          let fullname = name.split(".")
          let fn = fullname[0]
          let ln = fullname[1]
          let loginSchool0 = domain.split(".")
          let loginSchool = loginSchool0[0]


          let tmp = record.location.school.toLowerCase()

          if (tmp)
          {
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
            //    console.log(voisins);




                newData.push({
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
                          });
              }
          }
          //if (record.location.school.toLowerCase() == localStorage.getItem('schoolName').toLowerCase()) {


        //}

        });

        //console.log(`Data returned from data provider in getList:`);
        //console.log(JSON.stringify(newData, null, 8));
        return { data: newData, total: newData.length };
      });
  }
  else if (resource === "user")
  {
      return dataProvider.getList(resource, params).then(result => {
        /**
         * filtering data to only return only certain fields
         * imagine I have a custom data provider that runs on top of graphql
         * and only returns certain fields in getList
         */
        const newData = [];
        result.data.forEach(record => {
          let email = localStorage.getItem("username")
          var name   = email.substring(0, email.lastIndexOf("@"));
          var domain = email.substring(email.lastIndexOf("@") +1);
          let fullname = name.split(".")
          let fn = fullname[0]
          let ln = fullname[1]
          let loginSchool0 = domain.split(".")
          let loginSchool = loginSchool0[0]


          let tmp = record.school
          if (tmp)
          {
            tmp = tmp.toLowerCase()
            //console.log("dans if recodschool ressource user:")


                //var tmp = record.school
              //  if (tmp == .toLowerCase()) {
              let n = tmp.includes(loginSchool);
                //console.log("dans  NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
                //console.log(tmp)

                if (n)
                {
                  newData.push({
                    id: record._id,
                    email: record.email,
                    picture: "unknown.png",
                    school: record.school,
                    role: record.role
                  });
                }


          }
        });
        //console.log("ressource =====")
        //console.log(resource)
        //console.log(`Data returned from data provider in getList:`);
        //console.log(JSON.stringify(newData, null, 8));

        return { data: newData, total: newData.length };

      });
  }
}
