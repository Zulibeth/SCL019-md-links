const fs = require("fs");
const path = require("path");



// Ruta absoluta o relativa
const routeIsAbsolute = (filePath) => path.isAbsolute(filePath);
const routeIsNotAbsolute = (filePath) => path.resolve(filePath);


// Validar si la ruta existe
const validRoute = (filePath) => {
    return fs.existsSync(filePath);
};

// Revisa si la ruta es una carpeta
const routeIsFolder = (filePath) => {
    return fs.statSync(filePath).isDirectory();
};

//Revisa si es un archivo .md

const isMdFile = (filePath) => {
    return path.extname(filePath) === ".md";
};

//busqueda del archivo
const searchFile = (filePath) => {
    let arrayFiles = [];

    const searchFilesRecursively = (filePath) => {

    if (!routeIsFolder(filePath)) {
        //console.log("Tienes un archivo");
        if(isMdFile) {
            arrayFiles.push(filePath);
            //console.log("es un archivo .md")
        }
    }else{
       //console.log("Error: Se encontro una carpeta. Debe ingresar la ruta del archivo ") 
     const readDirectory = fs.readdirSync(filePath); //Lee el contenido de una carpeta de manera asincrona
     
     // union de la ruta encontrada
     let absolutePath = readDirectory.map((fileName) => path.join(filePath, fileName));
     //console.log(absolutePath);
     absolutePath.forEach((fileNamePath) => {
         searchFilesRecursively(fileNamePath)
     });
    }
 };
 searchFilesRecursively(filePath);
 
 return arrayFiles
};

const regxLink = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
const regxText = /\[[\w\s\d.()]+\]/;

const readLinks = (filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const arrayLinks = fileContent.match(regxLink);

    if(arrayLinks === null){
        return [];
    }

    return arrayLinks.map((myLinks) => {
        const myhref = myLinks.match(regxUrl).join().slice(1, -1);
        const myText = myLinks.match(regxText).join().slice(1, -1);

        return {
            href: myhref,
            text: myText,
            fileName: filePath
        }
    })

};

const linksTemplate = (arrayLinks) => {
    console.log("Links Encontrados");
    arrayLinks.forEach(link => {
        console.log(`\n\n*href: ${link.href} \n*Text: ${link.text} \n*File: ${link.fileName} \n\n`);
    })
}


module.exports = {
    routeIsNotAbsolute,
    routeIsAbsolute,
    validRoute,
    searchFile,
    readLinks,
    linksTemplate
}
