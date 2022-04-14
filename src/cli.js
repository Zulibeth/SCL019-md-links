#!/usr/bin/env node
const mdLinks = require("./md-Links")


const [,, ...args] = process.argv

if(args.length === 0){
     console.error("Ingrese la ruta de un archivo");
 }
 if(args.length === 1){
    // console.log(typeRoute);
    mdLinks(args[0])
    .then(console.log(args[0]))
    .catch(err => console.log(err));
   
 }
