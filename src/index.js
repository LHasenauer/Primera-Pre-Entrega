import express from "express";
import ProductRouter from "./router/users.routes.js";
import CartRouter from "./router/carts.routes.js";
import { __dirname } from "./util.js";
// Agregamos uso de WebSocket y Handlebars

import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { getProducts } from "./controllers/ProductManager.js";
import path from "path";

const app = express();
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const io =  new Server(server);
const PORT = 8080;

// Agregamos plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)

// Agregamos los archivos en el directorio public
app.use("/", express.static(__dirname + 'public'));

// agregamos ruta de home

app.get("/", async (req, res) => {
    res.send("hola");
});


// Manejamos conexiones con WebSocket
io.on("connection", (socket) =>{
    console.log("Nuevo cliente conectado");
    socket.on("mensaje", (data) =>{
        console.log("Mensaje recibido:", data)
    })

    socket.on("newProduct", async () =>{
        const product = await getProducts();
        io.emit("UpdateProducts", product)
    })
    socket.on("deleteProduct", async () =>{
        const product = await getProducts();
        io.emit("UpdateProducts", product)
    })
    
    // Emitir mensaje a clientes
    io.emit("actualización", { mensaje: "Se ha actualizado un producto"});
    
    // Desconexión del usuario
    socket.on("disconnect", ()=>{
        console.log("Cliente desconectado")
    });
})

server.listen(PORT, () => {
    console.log( `Servidor Express Puerto ${PORT}`);
});
