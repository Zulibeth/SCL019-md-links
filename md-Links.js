const infoRoute = require("./index");

const mdLinks = (userRoute) => {
   // console.log(userRoute);
    return new Promise((resolve, reject) => {

        const routeStatus = !infoRoute.routeIsAbsolute(userRoute) ? infoRoute.routeIsNotAbsolute(userRoute) : userRoute;
        const validRoute = infoRoute.validRoute(routeStatus);
       //console.log(routeStatus);
       //console.log(validRoute);

        if(validRoute){
            const filePathList = infoRoute.searchFile(routeStatus);
            //console.log(filePathList);
            let arrayLinks = filePathList.map((file) => {
                return infoRoute.readLinks(file);
            }).flat();
            resolve(arrayLinks);
        }else{
           reject(console.log(` La ruta ${routeStatus} no existe` ));
        }
    });
}

module.exports = mdLinks;