//const fs = require("fs");

//Escrbir nuevo archivo ( o sobreescribir existente) (ruta y formato)
fs.writeFileSync("./ejemplo.txt", "Hola");

//Consultar si existe el archivo
if (fs.existsSync("./ejemplo.txt")) {
  console.log("Verdadero");
} else {
  console.log("Falso");
}

//Leer un archivo existente (dois parametros ruta y formato)
let contenido = fs.readFileSync("./ejemplo.txt", "utf8");
console.log(contenido);

// Modifica sin pisar el archivo (lleva dos parametros ruta y agregado)
fs.appendFileSync("./ejemplo.txt", " Buenas tardes");
let agregado = fs.readFileSync("./ejemplo.txt", "utf8");
console.log(agregado);

//Elimina
fs.unlinkSync("./ejemplo.txt");

//-------------------Async----CallBacks-------------------------------

fs.writeFile("./ejemplo.txt", "Hola", (error) => {
  if (error) {
    return console.log("Error en la escritura");
  }
  fs.readFile("./ejemplo.txt", "utf-8", (error, resultado) => {
    if (error) {
      return console.log("Error en la lectura");
    }
    console.log(resultado);
    fs.appendFile("./ejemplo.txt", "Buenas nohces", (error) => {
      if (error) {
        return console.log("Error en append");
      }
      fs.readFile("./ejemplo.txt", "utf-8", (error, resultado) => {
        if (error) {
            return console.log("Error en la lectura");
        }
        console.log(resultado);
        fs.unlink("./ejemplo.txt", (error) => {
          if (error) {
            return console.log("Error en la eliminacion");
          }
        });
      });
    });
  });
});

//---------------Async----Promises-----------------------------

const fs = require('fs').promises

