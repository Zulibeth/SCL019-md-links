const infoRoute = require("./index");

const mdLinks = (userRoute, options) => {
    return new Promise((resolve, reject) => {

        const routeStatus = !infoRoute.routeIsAbsolute(userRoute) ? infoRoute.routeIsNotAbsolute(userRoute) : userRoute;
        const validRoute = infoRoute.validRoute(routeStatus);
        console.log(routeStatus);
       

        if(validRoute){
            const filePathList = infoRoute.searchFile(routeStatus);
            let arrayLinks = filePathList.map((file) => {
                return infoRoute.readLinks(file);
                
            }).flat();
           // console.log(arrayLinks)
            // if(options.validate === true){
            //     const linksValidated = infoRoute.getLinksStatus(arrayLinks);
            //     const myLinksValidated = linksValidated
            //     resolve(myLinksValidated);
            //     console.log(linksValidated);
            // }
            //else
             if(options.stats === true){
                resolve(linksTotal);
            }else {
                console.log("Please enter an option")
            }
            resolve(arrayLinks);
         }else{
           reject(console.log(` La ruta ${routeStatus} no existe` ));
        }
    });
}

module.exports = mdLinks;