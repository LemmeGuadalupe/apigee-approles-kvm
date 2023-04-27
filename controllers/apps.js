const {response, request} = require('express');
const Api = require('../models/api');


const rolApiPost = async(req = request, res = response) => {
    const api = new Api();
    
    try {
        const apiName = req.params.apiName;
        const environment = req.params.environment;
        const roles = req.query.roles;
        const rolesData  = JSON.parse(await api.getRolesData(apiName,environment));     

        console.log(rolesData.roles);
        console.log(rolesData);
        if (Array.isArray(roles))
            {
                rolesData.roles.concat(roles);
            }
        else
            {
                rolesData.roles.push(roles);
            }

        console.log(rolesData);
        const respuesta  = await api.updateRolesData(apiName,environment,JSON.stringify(rolesData));

        //let response = createResponseApp(respuesta.data, developer);
        res.statusCode = 200;
        res.json(respuesta);


    }  catch (error) {
        console.log("Error encontrado: ", error);
        let errorMessage = {
            "error": "Hubo un problema al dar de alta el rol"
        };
        res.statusCode = 500;
        res.json(errorMessage);
    }
}

const rolMetodoPost = async(req = request, res = response) => {
    const api = new Api();
    
    try {
        const apiName = req.params.apiName;
        const environment = req.params.environment;
        const metodo = req.body.metodo;
        const verbo = req.body.verbo;
        const roles = req.query.roles;
        const rolesData  = JSON.parse(await api.getRolesData(apiName,environment));     

        console.log(rolesData.roles);
        console.log(rolesData);

        if (rolesData.metodos.find(met => met.path == metodo) == null) //tengo que agregar el metodo
        {
            console.log("AGREGANDO METODO");
            const metodoNuevo = {
                "path": metodo,
                "roles": [],
                "verbos": []
            };
            rolesData.metodos.push(metodoNuevo)
        }

        if ((verbo != null) && (rolesData.metodos.find(met => met.path == metodo).verbos.find(v => v.verb == verbo) == null)); //tengo que agregar el verbo
        {
            console.log("AGREGANDO VERBO");
            const verboNuevo ={
                "roles": [],
                "verb": verbo
            };
            rolesData.metodos.find(met => met.path == metodo).verbos.push(verboNuevo);
        }

        if (Array.isArray(roles)) //agrego los roles
            {
                if(verbo == null){
                    console.log("verbo fue null y array");
                    rolesData.metodos.find(met => met.path == metodo).roles.concat(roles);
                }else{
                    rolesData.metodos.find(met => met.path == metodo).verbos.find(v => v.verb == verbo).roles.concat(roles);
                }
            }
        else
            {
                if(verbo == null){
                    console.log("verbo fue null y string");
                    rolesData.metodos.find(met => met.path == metodo).roles.push(roles);
                }else{
                    rolesData.metodos.find(met => met.path == metodo).verbos.find(v => v.verb == verbo).roles.push(roles);
                }
            }

        console.log(rolesData);
        const respuesta  = await api.updateRolesData(apiName,environment,JSON.stringify(rolesData));

        res.statusCode = 200;
        res.json(respuesta);


    }  catch (error) {
        console.log("Error encontrado: ", error);
        let errorMessage = {
            "error": "Hubo un problema al agregar el rol"
        };
        res.statusCode = 500;
        res.json(errorMessage);
    }
}


module.exports={
    rolApiPost,
    rolMetodoPost
}