USE bdvideojuegosmarlon;

/*Inserciones de categoria*/
INSERT INTO Categoria (nombre) VALUES
('Videojuegos');

INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES 
    (1, 'Grand Theft Auto V - Edición Premium (PS4)', 'GTA V', 29.99, 20),
    (1, 'The Legend of Zelda: Breath of the Wild (Switch)', 'Zelda BOTW', 49.99, 15),
    (1, 'FIFA 22 (Xbox Series X)', 'FIFA 22', 59.99, 40),
    (1, 'Super Mario Odyssey (Switch)', 'Super Mario Odyssey', 39.99, 18),
    (1, 'Call of Duty: Warzone (PC)', 'Call of Duty Warzone', 19.99, 30),
    (1, 'Animal Crossing: New Horizons (Switch)', 'Animal Crossing', 49.99, 22),
    (1, 'Red Dead Redemption 2 (Xbox One)', 'Red Dead Redemption 2', 39.99, 20),
    (1, 'Minecraft (PS4)', 'Minecraft', 19.99, 28),
    (1, 'Assassin\'s Creed Valhalla (PS5)', 'Assassin\'s Creed Valhalla', 59.99, 15),
    (1, 'Pokémon Brilliant Diamond (Nintendo Switch)', 'Pokémon Brilliant Diamond', 59.99, 12);
    
/*Inserciones de categoria*/
INSERT INTO Categoria (nombre) VALUES
('Monitores y Pantallas');

INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES 
    (2, 'Monitor de gaming 24 pulgadas, Full HD, 144Hz', 'Monitor Gaming 24"', 249.99, 10),
    (2, 'Monitor curvo ultrawide 34 pulgadas, QHD, 120Hz', 'Monitor Curvo 34"', 599.99, 5),
    (2, 'Monitor 4K HDR 27 pulgadas, IPS, 60Hz', 'Monitor 4K 27"', 399.99, 8),
    (2, 'Monitor portátil USB-C 15.6 pulgadas, Full HD, IPS', 'Monitor Portátil 15.6"', 199.99, 15),
    (2, 'Pantalla táctil interactiva 55 pulgadas, 4K UHD', 'Pantalla Táctil 55"', 1499.99, 3);

/*Inserciones de categoria*/
INSERT INTO Categoria (nombre) VALUES
('Sillas y Mobiliario');

INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES
    (3, 'Silla de escritorio ergonómica con respaldo alto', 'Silla Ergonómica', 199.99, 20),
    (3, 'Mesa de ordenador con superficie de vidrio templado', 'Mesa de Ordenador', 149.99, 15),
    (3, 'Estante organizador para accesorios de gaming', 'Estante Organizador', 49.99, 10),
    (3, 'Silla gamer reclinable con reposapiés retráctil', 'Silla Gamer Reclinable', 299.99, 8),
    (3, 'Escritorio ajustable en altura para trabajar de pie', 'Escritorio Ajustable', 349.99, 6);
    
/*Inserciones de categoria*/
INSERT INTO Categoria (nombre) VALUES
('Audio');

INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES
    (4, 'Altavoces de estantería Hi-Fi (pareja)', 'Altavoces Hi-Fi', 199.99, 10),
    (4, 'Auriculares inalámbricos con cancelación de ruido', 'Auriculares Inalámbricos', 149.99, 15),
    (4, 'Barra de sonido 2.1 canales con subwoofer inalámbrico', 'Barra de Sonido', 249.99, 8),
    (4, 'Micrófono de condensador USB para grabación y streaming', 'Micrófono USB', 79.99, 20),
    (4, 'Reproductor de vinilos con altavoces integrados', 'Tocadiscos', 299.99, 6);

/*Inserciones de categoria*/
INSERT INTO Categoria (nombre) VALUES
('Iluminación');

INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES (5, 'Bombilla inteligente LED WiFi, regulable y compatible con asistentes de voz', 'Bombilla Inteligente', 29.99, 20),
    (5, 'Tira LED RGB para iluminación ambiental, con control remoto', 'Tira LED RGB', 19.99, 30),
    (5, 'Lámpara de pie moderna con luz regulable y control táctil', 'Lámpara de Pie', 79.99, 15),
    (5, 'Foco LED empotrable para techo, luz blanca cálida', 'Foco LED Empotrable', 14.99, 40),
    (5, 'Luz nocturna LED con sensor de movimiento y luz cálida', 'Luz Nocturna LED', 9.99, 50);

/*Inserciones de categoria*/
INSERT INTO Categoria (nombre) VALUES
('Tarjetas');

INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES ();

/*Inserciones de categoria*/
INSERT INTO Categoria (nombre) VALUES
('Mandos');

INSERT INTO producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES 
    (7, 'Mando inalámbrico para consolas (compatible con PS5, Xbox Series X, Switch)', 'Mando Inalámbrico', 49.99, 20),
    (7, 'Mando con cable USB para PC y consolas (compatible con PS4, Xbox One)', 'Mando con Cable', 29.99, 30),
    (7, 'Joystick arcade para juegos de lucha y arcade', 'Joystick Arcade', 79.99, 15),
    (7, 'Volante y pedales para simuladores de carreras', 'Volante y Pedales', 199.99, 10),
    (7, 'Controlador de movimiento para juegos de realidad virtual', 'Controlador de Movimiento VR', 99.99, 10),
    (7, 'Mando retro USB para emuladores y juegos clásicos', 'Mando Retro USB', 39.99, 25),
    (7, 'Gamepad para dispositivos móviles (Android/iOS)', 'Gamepad para Móviles', 19.99, 40),
    (7, 'Mando arcade inalámbrico para consolas y PC', 'Mando Arcade Inalámbrico', 69.99, 15),
    (7, 'Mando especializado para juegos de lucha (Fightstick)', 'Fightstick', 129.99, 8),
    (7, 'Mando ergonómico con luces LED personalizables', 'Mando Ergonómico LED', 59.99, 20);
    
/*Inserciones de categoria*/
INSERT INTO Categoria (nombre) VALUES
('Consolas');

INSERT INTO producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES 
    (8, 'Consola de videojuegos PlayStation 5 (PS5)', 'PlayStation 5', 499.99, 10),
    (8, 'Consola de videojuegos Xbox Series X', 'Xbox Series X', 499.99, 8),
    (8, 'Consola de videojuegos Nintendo Switch', 'Nintendo Switch', 299.99, 15),
    (8, 'Consola retro de juegos arcade (Pandora Box)', 'Consola Retro Arcade', 299.99, 5),
    (8, 'Consola de videojuegos PlayStation 4 (PS4)', 'PlayStation 4', 299.99, 12),
    (8, 'Consola de videojuegos Xbox One', 'Xbox One', 299.99, 10),
    (8, 'Consola portátil de juegos (Nintendo Switch Lite)', 'Nintendo Switch Lite', 199.99, 20),
    (8, 'Consola clásica de videojuegos (NES Classic Edition)', 'NES Classic Edition', 59.99, 6),
    (8, 'Consola de videojuegos Sega Genesis Mini', 'Sega Genesis Mini', 79.99, 8),
    (8, 'Consola de realidad virtual (Oculus Quest 2)', 'Oculus Quest 2', 399.99, 4);
    
    
/*Inserciones de productos*/
INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES 
    (1, 'Final Fantasy VII Remake (PS4)', 'Final Fantasy VII Remake', 59.99, 10),
    (1, 'Horizon Zero Dawn (PS4)', 'Horizon Zero Dawn', 49.99, 15),
    (1, 'Cyberpunk 2077 (PC)', 'Cyberpunk 2077', 59.99, 25),
    (1, 'Halo Infinite (Xbox Series X)', 'Halo Infinite', 59.99, 20),
    (1, 'Spider-Man: Miles Morales (PS5)', 'Spider-Man: Miles Morales', 49.99, 18),
    (1, 'Resident Evil Village (PS5)', 'Resident Evil Village', 59.99, 15),
    (1, 'Ghost of Tsushima (PS4)', 'Ghost of Tsushima', 59.99, 20),
    (1, 'Mortal Kombat 11 (PS5)', 'Mortal Kombat 11', 49.99, 25),
    (1, 'The Witcher 3: Wild Hunt (Switch)', 'The Witcher 3', 39.99, 12),
    (1, 'Mario Kart 8 Deluxe (Switch)', 'Mario Kart 8 Deluxe', 59.99, 18);


 /*Inserciones de productos*/
INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES 
    (7, 'Mando profesional para eSports (compatible con PS5, Xbox Series X)', 'Mando Profesional eSports', 99.99, 10),
    (7, 'Mando adaptable para accesibilidad', 'Mando Adaptable', 59.99, 15),
    (7, 'Mando compacto para niños (compatible con PS4, Xbox One)', 'Mando Compacto', 29.99, 20),
    (7, 'Joystick para simuladores de vuelo', 'Joystick Simulador Vuelo', 149.99, 8),
    (7, 'Volante para juegos de carreras con force feedback', 'Volante Force Feedback', 249.99, 6),
    (7, 'Mando para juegos retro con diseño clásico', 'Mando Retro Clásico', 34.99, 25),
    (7, 'Controlador para juegos de música y ritmo', 'Controlador Juegos Música', 89.99, 10),
    (7, 'Mando inalámbrico con batería recargable', 'Mando Inalámbrico Recargable', 49.99, 20),
    (7, 'Gamepad con soporte para smartphone', 'Gamepad Smartphone', 29.99, 30),
    (7, 'Controlador para simuladores de vuelo con pedales', 'Controlador Vuelo con Pedales', 199.99, 5);
    
/*Inserciones de productos*/
INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES 
    (8, 'Consola de videojuegos Atari Flashback', 'Atari Flashback', 59.99, 10),
    (8, 'Consola de videojuegos PlayStation Classic', 'PlayStation Classic', 69.99, 8),
    (8, 'Consola portátil retro (Anbernic RG351)', 'Anbernic RG351', 99.99, 12),
    (8, 'Consola de videojuegos SNES Classic Edition', 'SNES Classic Edition', 79.99, 15),
    (8, 'Consola de videojuegos PlayStation Vita', 'PlayStation Vita', 199.99, 5),
    (8, 'Consola de videojuegos Xbox 360', 'Xbox 360', 149.99, 10),
    (8, 'Consola de videojuegos Wii U', 'Wii U', 249.99, 7),
    (8, 'Consola portátil retro (BittBoy)', 'BittBoy', 49.99, 20),
    (8, 'Consola de videojuegos Nintendo 3DS', 'Nintendo 3DS', 199.99, 12),
    (8, 'Consola portátil de juegos (GPD Win 3)', 'GPD Win 3', 799.99, 3);

SELECT * FROM categoria;
SELECT * FROM Producto;
