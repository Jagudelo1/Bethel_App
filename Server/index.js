const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bethel_app"
});

app.post("/enviar", (req, res) =>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    db.query('INSERT INTO administrador(nombre, apellido, correo, usuario, contrasena) VALUES (?,?,?,?,?)',[nombre,apellido,correo,usuario,contrasena],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send("Administrador registrado con éxito");
            }
        }
    );
});

app.get("/administrador", (req, res) =>{
    db.query('SELECT * FROM administrador',
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})