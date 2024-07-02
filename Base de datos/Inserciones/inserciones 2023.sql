/*inserciones 2023 enero, marzo,abril, julio y diciembre*/

/*enero*/
-- Enero 2023
INSERT INTO Venta (id_cliente, fecha) VALUES
(1, '2023-01-01'),
(2, '2023-01-02'),
(3, '2023-01-03'),
(4, '2023-01-04'),
(5, '2023-01-05'),
(6, '2023-01-06'),
(7, '2023-01-07'),
(8, '2023-01-08'),
(9, '2023-01-09'),
(10, '2023-01-10'),
(11, '2023-01-11'),
(12, '2023-01-12'),
(13, '2023-01-13'),
(14, '2023-01-14'),
(15, '2023-01-15'),
(16, '2023-01-16'),
(17, '2023-01-17'),
(18, '2023-01-18'),
(19, '2023-01-19'),
(20, '2023-01-20'),
(21, '2023-01-21'),
(22, '2023-01-22'),
(23, '2023-01-23'),
(24, '2023-01-24'),
(25, '2023-01-25'),
(26, '2023-01-26'),
(27, '2023-01-27'),
(28, '2023-01-28'),
(29, '2023-01-29'),
(30, '2023-01-30'),
(31, '2023-01-31');

/* Inserción de detalle */
INSERT INTO detalle (id_venta, id_producto, cantidad) VALUES
(1217, 1, 1), (1218, 1, 2), (1219, 1, 3),
(1220, 3, 1), (1221, 3, 2), (1222, 3, 3),
(1223, 45, 1), (1224, 45, 2), (1225, 45, 3),
(1226, 46, 1), (1227, 46, 2), (1228, 46, 3),
(1229, 60, 1), (1230, 60, 2), (1231, 60, 3),
(1232, 1, 1), (1233, 1, 2), (1234, 1, 3),
(1235, 3, 1), (1236, 3, 2), (1237, 3, 3),
(1238, 45, 1), (1239, 45, 2), (1240, 45, 3),
(1241, 51, 1), (1242, 51, 2), (1243, 51, 3),
(1244, 1, 1), (1245, 1, 2), (1246, 1, 3),
(1247, 3, 1);

/*marzo*/
INSERT INTO Venta (id_cliente, fecha) VALUES
-- Marzo 2023
(10, '2023-03-01'),
(11, '2023-03-02'),
(12, '2023-03-03'),
(13, '2023-03-04'),
(14, '2023-03-05'),
(15, '2023-03-06'),
(16, '2023-03-07'),
(17, '2023-03-08'),
(18, '2023-03-09'),
(19, '2023-03-10'),
(20, '2023-03-11'),
(21, '2023-03-12'),
(22, '2023-03-13'),
(23, '2023-03-14'),
(24, '2023-03-15'),
(25, '2023-03-16'),
(26, '2023-03-17'),
(27, '2023-03-18'),
(28, '2023-03-19'),
(29, '2023-03-20'),
(30, '2023-03-21'),
(31, '2023-03-22'),
(32, '2023-03-23'),
(33, '2023-03-24'),
(34, '2023-03-25'),
(35, '2023-03-26'),
(36, '2023-03-27'),
(37, '2023-03-28'),
(38, '2023-03-29'),
(39, '2023-03-30'),
(40, '2023-03-31');

/* Inserción de detalle */
INSERT INTO detalle (id_venta, id_producto, cantidad) VALUES
(1218, 1, 1), (1219, 1, 2), (1220, 1, 3),
(1221, 3, 1), (1222, 3, 2), (1223, 3, 3),
(1224, 45, 1), (1225, 45, 2), (1226, 45, 3),
(1227, 46, 1), (1228, 46, 2), (1229, 46, 3),
(1230, 60, 1), (1231, 60, 2), (1232, 60, 3),
(1233, 1, 1), (1234, 1, 2), (1235, 1, 3),
(1236, 3, 1), (1237, 3, 2), (1238, 3, 3),
(1239, 45, 1), (1240, 45, 2), (1241, 45, 3),
(1242, 51, 1), (1243, 51, 2), (1244, 51, 3),
(1245, 1, 1), (1246, 1, 2), (1247, 1, 3),
(1248, 3, 1);

/*abril*/
INSERT INTO Venta (id_cliente, fecha) VALUES
(41, '2023-04-01'), -- Reinicia el id_cliente
(42, '2023-04-02'),
(43, '2023-04-03'),
(44, '2023-04-04'),
(45, '2023-04-05'),
(46, '2023-04-06'),
(47, '2023-04-07'),
(48, '2023-04-08'),
(49, '2023-04-09'),
(50, '2023-04-10'),
(1, '2023-04-11'), -- Reinicia el id_cliente
(2, '2023-04-12'),
(3, '2023-04-13'),
(4, '2023-04-14'),
(5, '2023-04-15'),
(6, '2023-04-16'),
(7, '2023-04-17'),
(8, '2023-04-18'),
(9, '2023-04-19'),
(10, '2023-04-20'),
(11, '2023-04-21'),
(12, '2023-04-22'),
(13, '2023-04-23'),
(14, '2023-04-24'),
(15, '2023-04-25'),
(16, '2023-04-26'),
(17, '2023-04-27'),
(18, '2023-04-28'),
(19, '2023-04-29'),
(20, '2023-04-30');

/* Inserción de detalle */
INSERT INTO detalle (id_venta, id_producto, cantidad) VALUES
(1249, 1, 1), (1250, 1, 2), (1251, 1, 3),
(1252, 3, 1), (1253, 3, 2), (1254, 3, 3),
(1255, 45, 1), (1256, 45, 2), (1257, 45, 3),
(1258, 46, 1), (1259, 46, 2), (1260, 46, 3),
(1261, 60, 1), (1262, 60, 2), (1263, 60, 3),
(1264, 1, 1), (1265, 1, 2), (1266, 1, 3),
(1267, 3, 1), (1268, 3, 2), (1269, 3, 3),
(1270, 45, 1), (1271, 45, 2), (1272, 45, 3),
(1273, 51, 1), (1274, 51, 2), (1275, 51, 3),
(1276, 1, 1), (1277, 1, 2), (1278, 1, 3),
(1279, 3, 1);

/*julio*/
INSERT INTO Venta (id_cliente, fecha) VALUES
(32, '2023-07-01'), -- Reinicia el id_cliente
(33, '2023-07-02'),
(34, '2023-07-03'),
(35, '2023-07-04'),
(36, '2023-07-05'),
(37, '2023-07-06'),
(38, '2023-07-07'),
(39, '2023-07-08'),
(40, '2023-07-09'),
(41, '2023-07-10'),
(42, '2023-07-11'),
(43, '2023-07-12'),
(44, '2023-07-13'),
(45, '2023-07-14'),
(46, '2023-07-15'),
(47, '2023-07-16'),
(48, '2023-07-17'),
(49, '2023-07-18'),
(50, '2023-07-19'),
(1, '2023-07-20'), -- Reinicia el id_cliente
(2, '2023-07-21'),
(3, '2023-07-22'),
(4, '2023-07-23'),
(5, '2023-07-24'),
(6, '2023-07-25'),
(7, '2023-07-26'),
(8, '2023-07-27'),
(9, '2023-07-28'),
(10, '2023-07-29'),
(11, '2023-07-30'),
(12, '2023-07-31');

/* Inserción de detalle */
INSERT INTO detalle (id_venta, id_producto, cantidad) VALUES
(1280, 1, 1), (1281, 1, 2), (1282, 1, 3),
(1283, 3, 1), (1284, 3, 2), (1285, 3, 3),
(1286, 45, 1), (1287, 45, 2), (1288, 45, 3),
(1289, 46, 1), (1290, 46, 2), (1291, 46, 3),
(1292, 60, 1), (1293, 60, 2), (1294, 60, 3),
(1295, 1, 1), (1296, 1, 2), (1297, 1, 3),
(1298, 3, 1), (1299, 3, 2), (1300, 3, 3),
(1301, 45, 1), (1302, 45, 2), (1303, 45, 3),
(1304, 51, 1), (1305, 51, 2), (1306, 51, 3),
(1307, 1, 1), (1308, 1, 2), (1309, 1, 3),
(1310, 3, 1);

-- Diciembre 2023
INSERT INTO Venta (id_cliente, fecha) VALUES
(1, '2023-12-01'),
(2, '2023-12-02'),
(3, '2023-12-03'),
(4, '2023-12-04'),
(5, '2023-12-05'),
(6, '2023-12-06'),
(7, '2023-12-07'),
(8, '2023-12-08'),
(9, '2023-12-09'),
(10, '2023-12-10'),
(11, '2023-12-11'),
(12, '2023-12-12'),
(13, '2023-12-13'),
(14, '2023-12-14'),
(15, '2023-12-15'),
(16, '2023-12-16'),
(17, '2023-12-17'),
(18, '2023-12-18'),
(19, '2023-12-19'),
(20, '2023-12-20'),
(21, '2023-12-21'),
(22, '2023-12-22'),
(23, '2023-12-23'),
(24, '2023-12-24'),
(25, '2023-12-25'),
(26, '2023-12-26'),
(27, '2023-12-27'),
(28, '2023-12-28'),
(29, '2023-12-29'),
(30, '2023-12-30'),
(31, '2023-12-31');

/* Inserción de detalle */
INSERT INTO detalle (id_venta, id_producto, cantidad) VALUES
(1311, 1, 1), (1312, 1, 2), (1313, 1, 3),
(1314, 3, 1), (1315, 3, 2), (1316, 3, 3),
(1317, 45, 1), (1318, 45, 2), (1319, 45, 3),
(1320, 46, 1), (1321, 46, 2), (1322, 46, 3),
(1323, 60, 1), (1324, 60, 2), (1325, 60, 3),
(1326, 1, 1), (1327, 1, 2), (1328, 1, 3),
(1329, 3, 1), (1330, 3, 2), (1331, 3, 3),
(1332, 45, 1), (1333, 45, 2), (1334, 45, 3),
(1335, 51, 1), (1336, 51, 2), (1337, 51, 3),
(1338, 1, 1), (1339, 1, 2), (1340, 1, 3),
(1341, 3, 1);