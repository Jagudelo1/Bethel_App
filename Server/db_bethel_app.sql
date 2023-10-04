create database bethel_app;

use bethel_app;

create table administrador(
id_admin int not null primary key auto_increment,
nombre varchar(100),
apellido varchar(100),
correo varchar(400),
usuario varchar(50),
contrasena varchar(20));

select * from administrador;
drop database bethel_app;