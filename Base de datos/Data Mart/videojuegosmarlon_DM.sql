CREATE DATABASE videojuegosmarlon_DM;
USE videojuegosmarlon_DM;

CREATE TABLE Dim_Tiempo (
  id_tiempo INT PRIMARY KEY,
  fecha DATE,
  anyo INT,
  mes INT,
  dia INT,
  semestre INT
);

UPDATE Dim_Tiempo
SET semestre = CASE 
    WHEN mes BETWEEN 1 AND 6 THEN 1
    WHEN mes BETWEEN 7 AND 12 THEN 2
END;

CREATE TABLE Dim_Cliente (
  id_cliente INT PRIMARY KEY,
  nombre VARCHAR(20),
  apellido VARCHAR(20),
  telefono VARCHAR(8)
);

CREATE TABLE Dim_Producto (
  id_producto INT PRIMARY KEY,
  nombreProducto VARCHAR(30),
  precio INT,
  Categoria VARCHAR (30),
  descripcion VARCHAR(100),
  Stock INT
);

CREATE TABLE Hechos_Ventas (
  id_hventas INT PRIMARY KEY,
  id_venta INT ,
  id_producto INT,
  id_tiempo INT,
  id_cliente INT,
  fecha DATE,
  cantidad INT,
  precio_unitario INT,
  total_venta INT,
  FOREIGN KEY (id_tiempo) REFERENCES Dim_Tiempo(id_tiempo),
  FOREIGN KEY (id_producto) REFERENCES Dim_Producto(id_producto),
  FOREIGN KEY (id_cliente) REFERENCES Dim_Cliente(id_cliente)
);

SELECT * FROM dim_tiempo;
SELECT * FROM dim_cliente;
SELECT * FROM dim_producto;
SELECT * FROM hechos_ventas;
