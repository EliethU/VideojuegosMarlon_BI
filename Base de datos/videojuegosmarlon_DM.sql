CREATE DATABASE videojuegosmarlon_DM;

USE videojuegosmarlon_DM;

CREATE TABLE Hechos_Ventas (
  id_ventas int primary key,
  id_producto int,
  id_tiempo int,
  id_cliente int,
  cantidad int, 
  total int
);

CREATE TABLE Dim_Tiempo (
  id_tiempo INT PRIMARY KEY,
  fecha date,
  anyo VARCHAR(8),
  mes VARCHAR(20),
  dia INT,
  hora int
);

CREATE TABLE Dim_Cliente (
  id_cliente INT PRIMARY KEY,
  nombre VARCHAR(20),
  apellido VARCHAR(20),
  telefono VARCHAR(8)
);

CREATE TABLE Dim_Producto (
  id_producto INT PRIMARY KEY,
  nombreProducto varchar(30),
  precio INT,
  categoria varchar(30),
  descripcion varchar(100),
  cantidad int
);

ALTER TABLE Hechos_Ventas ADD FOREIGN KEY (id_tiempo) REFERENCES Dim_Tiempo (id_tiempo);

ALTER TABLE Hechos_Ventas ADD FOREIGN KEY (id_producto) REFERENCES Dim_Producto (id_producto);

ALTER TABLE Hechos_Ventas ADD FOREIGN KEY (id_cliente) REFERENCES Dim_Cliente (id_cliente);
