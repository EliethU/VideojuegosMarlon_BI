CREATE DATABASE IF NOT EXISTS BDVideojuegosMarlon;
USE BDVideojuegosMarlon;

/*Inicio de seccion Login*/
/* Tabla de Usuario*/
CREATE TABLE Usuario (
  id_Usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT, /*Autoincrementable*/
  nombre_Usuario VARCHAR(20) NOT NULL,
  contraseña VARCHAR(8) NOT NULL,
  Rol VARCHAR(20) NOT NULL
);

SELECT * FROM Producto;
SELECT * FROM cliente;

INSERT INTO Usuario (nombre_Usuario, contraseña, Rol)
VALUES ('Josnel', '202322', 'administrador');

INSERT INTO Usuario (nombre_Usuario, contraseña, Rol)
VALUES ('Elieth', '202322', 'administrador');


 /* Tabla de Clientes */
CREATE TABLE Cliente (
 id_cliente INT NOT NULL AUTO_INCREMENT,
 id_Usuario INT NOT NULL,
 nombre VARCHAR(20) NOT NULL,
 apellido VARCHAR(20) NOT NULL,
 telefono VARCHAR(8),
 FOREIGN KEY (id_usuario) REFERENCES Usuario (id_Usuario),
 PRIMARY KEY (id_cliente)
 );

/* Tabla de Categorías */
CREATE TABLE Categoria(
    id_categoria INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_categoria)
 );  

/* Tabla de Productos */
CREATE TABLE Producto(
    id_producto INT NOT NULL AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    nombreProducto VARCHAR(30) NOT NULL,
    precio FLOAT NOT NULL,
    Stock INT NOT NULL,
    imagen LONGTEXT,
    FOREIGN KEY (id_categoria) REFERENCES Categoria (id_categoria),
    PRIMARY KEY (id_producto)
);

/* Tabla de Ventas */
CREATE TABLE Venta(
    id_venta INT NOT NULL AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
    PRIMARY KEY (id_venta)
);

/* Tabla de Detalles de Venta */
CREATE TABLE Detalle(
    id_detalle INT NOT NULL AUTO_INCREMENT,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES Venta (id_venta),
    FOREIGN KEY (id_producto) REFERENCES Producto (id_producto),
    PRIMARY KEY (id_detalle)
);

/* Creación de la tabla bitácora en la BD BDVideojuegosMarlon */
/* Tabla de Bitácora */
CREATE TABLE Bitacora (
    id_bitacora INT NOT NULL AUTO_INCREMENT,
    transaccion VARCHAR(10) NOT NULL,
    usuario VARCHAR(40) NOT NULL,
    fecha DATETIME NOT NULL,
    tabla VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_bitacora)
);


/*Inserciones de prueba*/
INSERT INTO Detalle (id_detalle, id_venta, id_producto, cantidad)
VALUES (4, 3, 2, 5);
INSERT INTO Venta (id_venta,id_cliente,fecha)
VALUES (4,2,'2023-02-03');

SELECT * FROM Venta;
SELECT * FROM detalle;

SELECT 
    DATE_FORMAT(V.fecha, '%Y-%m') AS Mes, 
    SUM(D.cantidad * P.precio) AS IngresosTotales 
FROM 
    Venta V 
    JOIN Detalle D ON V.id_venta = D.id_venta 
    JOIN Producto P ON D.id_producto = P.id_producto 
GROUP BY 
    DATE_FORMAT(V.fecha, '%Y-%m');
 
INSERT INTO Usuario (nombre_Usuario, contraseña, Rol)
VALUES ('Josnel', '202322', 'administrador');

INSERT INTO Usuario (nombre_Usuario, contraseña, Rol)
VALUES ('Elieth', '202322', 'administrador');

SELECT * FROM Venta;
SELECT * FROM detalle;
SELECT * FROM Producto;
SELECT * FROM cliente;
SELECT * FROM categoria;

