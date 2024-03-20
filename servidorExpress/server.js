import express from "express"
//import nombre Modulo from "nombreModulo"
//import Archivo from "ruta/del/archivo.js"


//Definimos el servidor
const server = express ()

//se crea el servidor
const port = 8080
const ready = () => console.log("server ready on port"+port)

server.listen (port, ready)

//router

server.get("/", async(requerimientos, respuestas)=>{

    try{
        return respuestas.status(200).json({
            response:"coder Api",
            success: true

        })
    } catch (error){
        console.log(error);
        return respuestas.status(500).json ({
            response: "coder Api Error",
            success: false
        })
    }
})