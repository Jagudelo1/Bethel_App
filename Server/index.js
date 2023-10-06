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

// Enviar información a Base de Datos //
app.post("/enviar", (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    // Verificar si el usuario o el correo ya existen
    db.query('SELECT * FROM administrador WHERE usuario = ? OR correo = ?', [usuario, correo], (err, rows) => {
        if (err) {
            console.log(err);
            res.json({ success: false, message: "Error al verificar el usuario o correo" });
        } else if (rows.length > 0) {
            // Usuario o correo ya existen en la base de datos
            res.json({ success: false, message: "El usuario o correo ya están registrados" });
        } else {
            // No se encontraron coincidencias, proceder con la inserción
            db.query('INSERT INTO administrador(nombre, apellido, correo, usuario, contrasena) VALUES (?,?,?,?,?)', [nombre, apellido, correo, usuario, contrasena], (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({ success: false, message: "Error al registrar el administrador" });
                } else {
                    res.json({ success: true, message: "Administrador registrado con éxito" });
                }
            });
        }
    });
});

// Llamar usuario y contraseña para validar login //
app.post('/entrar', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    const values = [ usuario, contrasena ]

    db.query("SELECT * FROM administrador WHERE usuario = ? AND contrasena = ?", values, 
    (err, result) => {
        if(err){
            res.status(500).send(err)
        }else{
            if(result.length > 0){
                res.status(200).send({
                    "id": result[0].id,
                    "nombre": result[0].nombre,
                    "usuario": result[0].usuario
                })
            }else{
                res.status(400).send("Usuario no encontrado")
            }
        }
    });
});

// Ruta para obtener los datos del usuario


app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})