create database bethel_app;

use bethel_app;

create table administrador(
id_admin int not null primary key,
nombre_admin varchar(100),
apellido_admin varchar(100),
correo varchar(400),
contrasena varchar(20));