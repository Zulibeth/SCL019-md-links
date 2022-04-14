const infoRoute = require("../index");

const mdLinks = (userRoute) => {
    return new Promise( () =>{

        const absoluteRoute = infoRoute.routeToAbsolute(userRoute);
        const validRoute = infoRoute.validRoute(absoluteRoute);

        if(!validRoute === true){
           //(console.log("La ruta es valida"));
           const readFile = infoRoute.searchFile(absoluteRoute);
        }else{
           (console.log("La ruta no existe "));
        }
    })
}

module.exports = mdLinks;