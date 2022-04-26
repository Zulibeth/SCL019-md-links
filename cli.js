#!/usr/bin/env node
const mdLinks = require("./md-Links");
const infoRoute = require("./index");


const [,, ...args] = process.argv
//console.log(args);
if(args.length === 0){
     console.error("Ingrese la ruta de un archivo");
 }
 if(args.length === 1){
    //console.log(args[0])
    mdLinks(args[0], { validate:false })
    .then(arrayLinks => infoRoute.linksTemplate(arrayLinks))
    .catch(err => console.log(err));
    //console.log(args[0]);
   
 }
