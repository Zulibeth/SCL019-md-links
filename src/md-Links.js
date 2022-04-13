const infoRoute = require("../index");

const mdLinks = (userRoute) => {
    return new Promise( (resolve, reject) =>{

        const absoluteRoute = infoRoute.routeToAbsolute(userRoute);
        const validRoute = infoRoute.validRoute(absoluteRoute);

        if(validRoute === true){
           resolve( console.log("La ruta es valida"));
        }else{
            reject(console.log("La ruta no existe "));
        }
    })
}

module.exports = mdLinks;