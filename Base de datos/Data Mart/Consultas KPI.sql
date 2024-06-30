SELECT 
    DATE_FORMAT(V.fecha, '%Y-%m') AS Mes, 
    SUM(D.cantidad * P.precio) AS IngresosTotales 
FROM 
    Venta V 
    JOIN Detalle D ON V.id_venta = D.id_venta 
    JOIN Producto P ON D.id_producto = P.id_producto 
GROUP BY 
    DATE_FORMAT(V.fecha, '%Y-%m');
    
    
    SELECT 
    P.nombreProducto, 
    SUM(D.cantidad * P.precio) AS IngresosPorProducto 
FROM 
    Detalle D 
    JOIN Producto P ON D.id_producto = P.id_producto 
GROUP BY 
    P.nombreProducto;
    
    SELECT 
    MesActual.Mes, 
    ((MesActual.IngresosTotales - IFNULL(MesAnterior.IngresosTotales, 0)) / IFNULL(MesAnterior.IngresosTotales, 1)) * 100 AS TasaCrecimiento 
FROM 
    (SELECT DATE_FORMAT(V.fecha, '%Y-%m') AS Mes, SUM(D.cantidad * P.precio) AS IngresosTotales 
     FROM Venta V 
     JOIN Detalle D ON V.id_venta = D.id_venta 
     JOIN Producto P ON D.id_producto = P.id_producto 
     GROUP BY DATE_FORMAT(V.fecha, '%Y-%m')) MesActual 
LEFT JOIN 
    (SELECT DATE_FORMAT(V.fecha, '%Y-%m') AS Mes, SUM(D.cantidad * P.precio) AS IngresosTotales 
     FROM Venta V 
     JOIN Detalle D ON V.id_venta = D.id_venta 
     JOIN Producto P ON D.id_producto = P.id_producto 
     GROUP BY DATE_FORMAT(V.fecha, '%Y-%m')) MesAnterior 
ON DATE_FORMAT(DATE_ADD(STR_TO_DATE(MesActual.Mes, '%Y-%m-01'), INTERVAL -1 MONTH), '%Y-%m') = MesAnterior.Mes;

SELECT 
    (COUNT(DISTINCT V.id_cliente) / COUNT(U.id_Usuario)) * 100 AS TasaConversion 
FROM 
    Usuario U 
    LEFT JOIN Cliente C ON U.id_Usuario = C.id_usuario 
    LEFT JOIN Venta V ON C.id_cliente = V.id_cliente;
    
  SELECT 
    C.id_cliente, 
    COUNT(V.id_venta) AS FrecuenciaUso 
FROM 
    Cliente C 
    JOIN Venta V ON C.id_cliente = V.id_cliente 
GROUP BY 
    C.id_cliente;
    
    SELECT 
    P.nombreProducto, 
    SUM(D.cantidad) AS TotalCantidad 
FROM 
    Detalle D 
    JOIN Producto P ON D.id_producto = P.id_producto 
GROUP BY 
    P.nombreProducto 
ORDER BY 
    TotalCantidad DESC;




