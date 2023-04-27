const axios = require('axios').default;
require('dotenv').config()

class Api{
    basicAuth = '';
    org = '';

    constructor(){
        const base =`${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`;
        this.basicAuth = Buffer.from(base).toString('base64');
        this.org = process.env.ORG_NAME;
    }

    async getRolesData(apiName,environment){
      try{
          const instance = axios.create({
              baseURL: `https://api.enterprise.apigee.com/v1/organizations/${process.env.ORG_NAME}/environments/${environment}/keyvaluemaps/${process.env.KVM_NAME}/entries/${apiName}`,
              headers: {'Authorization': `Basic ${this.basicAuth}`}
          });
          const resp = await instance.get();
          return resp.data.value;
      } catch (error){
          console.log(error);
          return error.response;
      }
  }

  async updateRolesData(apiName,environment,rolesData){

    var data = JSON.stringify({
        "name": apiName,
        "value": rolesData
      });
    
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.enterprise.apigee.com/v1/organizations/${process.env.ORG_NAME}/environments/${environment}/keyvaluemaps/${process.env.KVM_NAME}/entries/${apiName}`,
      headers: {'Authorization': ` Basic ${this.basicAuth}`, 'Content-Type' : 'application/json'},
      data : data
    };

    try{

        const resp = await axios(config);
        console.log(resp.data);
        return resp.data;
    } catch (error){
        console.log(error);
        return error.response;
    }
}


}

module.exports = Api;