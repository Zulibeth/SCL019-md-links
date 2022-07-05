const fs = require("fs");
const path = require("path");
//const fetch = require("node-fetch")


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


//busqueda del archivo recursivamente
const searchFile = (filePath) => {
    let arrayFiles = [];

    const searchFilesRecursively = (filePath) => {

    if (!routeIsFolder(filePath)) {
        if(isMdFile) {
            arrayFiles.push(filePath);
        }
    }else{
     const readDirectory = fs.readdirSync(filePath); //Lee el contenido de una carpeta 
     
     // union de la ruta encontrada
     let absolutePath = readDirectory.map((fileName) => path.join(filePath, fileName));
     absolutePath.forEach((fileNamePath) => {
         searchFilesRecursively(fileNamePath)
     });
    }
 };
 searchFilesRecursively(filePath);
 
 return arrayFiles
};


// Extraer propiedades de los links 

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
        const href = myLinks.match(regxUrl).join().slice(1, -1);
        const myText = myLinks.match(regxText).join().slice(1, -1);

        return {
            href,
            text: myText,
            fileName: filePath
        }
    })

};

//Mostrar propiedades de los links
const linksTemplate = (arrayLinks) => {
    console.log("Links Encontrados");
    arrayLinks.forEach(link => {
        console.log(`
        
        *href: ${link.href}
        *Text: ${link.text} 
        *File: ${link.fileName} 
        
        `);
    })
}

//Status de los Links
// const getLinksStatus = (arrLinks) => {
//     const statusOfLinks = arrLinks.map((element)  => 
//     fetch(element.href)
//      .then((res) => {
//          let propertysOfLinks = {
//             href: element.href,
//             file: element.file,
//             text: element.text,
//             status: res.status,
//          }
//          if (res.status >= 200 && res.status <= 399){
//              propertysOfLinks.textStatus = "ok"
//          }else{
//              propertysOfLinks.textStatus = res.statusText
//          }
//          return propertysOfLinks
//         // element.status = res.status,
//         // element.message = (res.status >= 200) && (res.status <= 399) ? "ok" : "fail";
        
//     })
//      .catch((error) => ({
//         //return{
//             href: element.href,
//             text: element.text,
//             file: element.file,
//             status: "Not found" + error,
//             message: "fail"
//         }))
    
//     );
//     //return statusOfLinks
//     return Promise.all(statusOfLinks);
//  };
    
 


// const getLinksStatus = (arrayLinks) => {
//    const statusOfLinks = arrayLinks.forEach(link => {
//         if ((link.status === 200) && (link.status<= 399)){
//             console.log((`\t*href: ${link.href} \n\t*status: ${link.status} \n\t*ok:${link.ok} \n`)); 
//         }else{
//             console.log((`\t*href: ${link.href} \n\t*status: ${link.status} \n\t*fail: ${link.fail} \n\t \n`));
//         }
//         return statusOfLinks
//   })
// }





//TOTAL LINKS
const totalLinks = (arrayLinks) => {
    const totalArray = arrayLinks.map(link => link.href);
    const uniqueLinks = [... new Set(totalArray)];
    const brokenLinks = arrayLinks.filter(link => link.status >= 400);

    return `
    ${(`\t-Total Links: ${totalArray.length} \n\t-Unique Links: ${uniqueLinks.length}\n\t-Broken Links: ${brokenLinks.length}`)}`
};


module.exports = {
    routeIsNotAbsolute,
    routeIsAbsolute,
    validRoute,
    searchFile,
    readLinks,
    linksTemplate,
    //getLinksStatus,
    totalLinks
}
