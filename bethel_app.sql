create database bethel_app;

use bethel_app;

create table administrador(
id_admin int not null primary key auto_increment,
nombre varchar(100) not null,
apellido varchar(100) not null,
correo varchar(200) not null,
usuario varchar(50) not null,
contrasena varchar(50) not null);

create table facturas(
id_fact int not null primary key auto_increment,
fecha date not null,
cliente varchar(100) not null,
cedulaNit int not null,
descripcion varchar(200),
cantidad int not null,
precioUnitario int not null,
precioTotal int not null);

select * from administrador;
select * from facturas;
drop database bethel_app;