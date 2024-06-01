USE videojuegosmarlon_dm;

/*Consultas Data Mart*/
SELECT
    CONCAT(YEAR(fecha), LPAD(MONTH(fecha), 2, '0'), LPAD(DAY(fecha), 2, '0')) AS ID_Tiempo,
    fecha AS Fecha,
    YEAR(fecha) AS Anyo,
    MONTH(fecha) AS Mes,
    DAY(fecha) AS Dia
FROM (
    SELECT 
        DATE_ADD('2024-01-01', INTERVAL (a.num + b.num * 10 + c.num * 100) DAY) AS fecha
    FROM 
        (SELECT 0 AS num UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
        CROSS JOIN (SELECT 0 AS num UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
        CROSS JOIN (SELECT 0 AS num UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c
    WHERE 
        DATE_ADD('2024-01-01', INTERVAL (a.num + b.num * 10 + c.num * 100) DAY) BETWEEN '2024-01-01' AND '2024-12-31'
) AS dates;


-- Ventas totales por año:
SELECT 
    Anyo, 
    SUM(total_venta) AS Ventas_totales
FROM 
    Hechos_Ventas
JOIN 
    Dim_Tiempo ON Hechos_Ventas.ID_Tiempo = Dim_Tiempo.ID_Tiempo
GROUP BY 
    Anyo;


-- Ventas totales por mes de un año específico (por ejemplo, 2024):
SELECT 
    Mes, 
    SUM(total_venta) AS Ventas_totales
FROM 
    Hechos_Ventas
JOIN 
    Dim_Tiempo ON Hechos_Ventas.ID_Tiempo = Dim_Tiempo.ID_Tiempo
WHERE 
    Anyo = 2022
GROUP BY 
    Mes;


-- Ventas totales por día de un mes y año específicos (por ejemplo, mayo de 2022):
SELECT 
    Dia, 
    SUM(total_venta) AS Ventas_totales
FROM 
    Hechos_Ventas
JOIN 
    Dim_Tiempo ON Hechos_Ventas.ID_Tiempo = Dim_Tiempo.ID_Tiempo
WHERE 
    Anyo = 2022 AND Mes = 5
GROUP BY 
    Dia;

-- Ventas totales por producto:
SELECT 
    P.id_producto, 
    P.nombreProducto, 
    SUM(hv.cantidad) AS Cantidad_vendida, 
    SUM(hv.total_venta) AS Ventas_totales
FROM 
    Hechos_Ventas hv
JOIN 
    Dim_Producto p ON hv.id_producto = p.id_producto
GROUP BY 
    P.id_producto, P.nombreProducto;


-- Ventas totales por categoría de producto:
SELECT 
    p.nombre,
    SUM(hv.total_venta) AS Ventas_Totales
FROM 
    Hechos_Ventas hv
JOIN 
    Dim_Producto p ON hv.id_producto = p.id_producto
GROUP BY 
    p.nombre
ORDER BY 
    Ventas_Totales DESC;
    
-- Promedio de ventas por producto:    
SELECT 
    p.nombreProducto,
    AVG(hv.total_venta) AS Promedio_Ventas
FROM 
    Hechos_Ventas hv
JOIN 
    Dim_Producto p ON hv.id_producto = p.id_producto
GROUP BY 
    p.nombreProducto
ORDER BY 
    Promedio_Ventas DESC;


-- Ventas por producto y por mes:
SELECT 
    p.nombreProducto,
    t.Mes,
    t.Anyo,
    SUM(hv.total_venta) AS Ventas_Totales
FROM 
    Hechos_Ventas hv
JOIN 
    Dim_Producto p ON hv.id_producto = p.id_producto
JOIN 
    Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
GROUP BY 
    p.nombreProducto, t.Mes, t.Anyo
ORDER BY 
    t.Anyo, t.Mes, Ventas_Totales DESC;

    
-- Top 5 productos más vendidos por cantidad:
SELECT 
    p.nombreProducto,
    SUM(hv.cantidad) AS Cantidad_Total_Vendida
FROM 
    Hechos_Ventas hv
JOIN 
    Dim_Producto p ON hv.id_producto = p.id_producto
GROUP BY 
    p.nombreProducto
ORDER BY 
    Cantidad_Total_Vendida DESC
LIMIT 5;
