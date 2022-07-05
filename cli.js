#!/usr/bin/env node
const mdLinks = require("./md-Links");
const infoRoute = require("./index");


const [,, ...args] = process.argv
//console.log(args);
if(args.length === 0){
     console.error("Ingrese la ruta de un archivo");
 }
 if(args.length === 1){
    mdLinks(args[0], {validate: false})
    .then(arrayLinks => infoRoute.linksTemplate(arrayLinks))
    .catch(err => console.log(err));
   
 }

const positionOne = args[1];

//  if (args.length === 2 && (positionOne === "--validate" || positionOne === "-v")){
//     mdLinks(args[0], {validate: true})
//       .then(arrayLinks => infoRoute.getLinksStatus(arrayLinks))
//       .catch(err => console.log(err));
//  }

 
 if (args.length === 2 && (positionOne === "--stats" || positionOne === "-s")){
   mdLinks(args[0], {validate: true})
     .then(arrayLinks => console.log(infoRoute.totalLinks(arrayLinks)))
     .catch(err => console.log(err));
}


