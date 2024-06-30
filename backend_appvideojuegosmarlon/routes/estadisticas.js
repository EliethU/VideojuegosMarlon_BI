const express = require('express');
const router = express.Router();

module.exports = (db) => {

    //Ruta de estado almacen
    router.get('/estadoalmacen', (req, res) => {
        const sql = `SELECT nombreProducto, Stock FROM Dim_Producto`;
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error al leer los productos:', err);
                res.status(500).json({ error: 'Error al leer los productos' });
            } else {
                // Devolver los registros en formato JSON como respuesta
                res.status(200).json(result);
            }
        });
    });
    
//Consulta de ventas por año
    router.get('/ventasporanyo', (req, res) => {

    const sql = `SELECT 
    Anyo, 
    SUM(total_venta) AS Ventas_totales
        FROM 
    Hechos_Ventas
        JOIN 
    Dim_Tiempo ON Hechos_Ventas.ID_Tiempo = Dim_Tiempo.ID_Tiempo
        GROUP BY 
    Anyo;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
        if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
        } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
        }
    });
    });

    //Consulta de ventas totales por mes de un año específico
    router.get('/ventaspormes', (req, res) => {

    const sql = `SELECT 
    Mes, 
    SUM(total_venta) AS Ventas_totales
        FROM 
    Hechos_Ventas
        JOIN 
    Dim_Tiempo ON Hechos_Ventas.ID_Tiempo = Dim_Tiempo.ID_Tiempo
        WHERE 
    Anyo = 2022
        GROUP BY 
    Mes;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
        if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por mes' });
        } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
        }
    });
    });

 //Consulta de ventas totales por día de un mes y año específicos
    router.get('/ventaspordia', (req, res) => {

    const sql = `SELECT 
    Dia, 
    SUM(total_venta) AS Ventas_totales
        FROM 
    Hechos_Ventas
        JOIN 
    Dim_Tiempo ON Hechos_Ventas.ID_Tiempo = Dim_Tiempo.ID_Tiempo
        WHERE 
    Anyo = 2022 AND Mes = 5
        GROUP BY 
    Dia;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
        if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por dia' });
        } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
        }
    });
    });

    //Consulta de ventas totales por producto
    router.get('/ventasporproducto', (req, res) => {

        const sql = `SELECT 
        P.id_producto, 
        P.nombreProducto, 
        SUM(hv.cantidad) AS Cantidad_vendida, 
        SUM(hv.total_venta) AS Ventas_totales
            FROM 
        Hechos_Ventas hv
            JOIN 
        Dim_Producto p ON hv.id_producto = p.id_producto
            GROUP BY 
        P.id_producto, P.nombreProducto;`;
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla ventas totales por productos' });
            } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
            }
        });
        });
    
    //Consulta de ventas totales por categoría de producto:
    router.get('/ventasporcategoria', (req, res) => {

        const sql = `SELECT 
        p.nombre,
        SUM(hv.total_venta) AS Ventas_Totales
    FROM 
        Hechos_Ventas hv
    JOIN 
        Dim_Producto p ON hv.id_producto = p.id_producto
    GROUP BY 
        p.nombre
    ORDER BY 
        Ventas_Totales DESC;`;
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla ventas totales por categoria' });
            } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
            }
        });
        });    

        //Consulta de Promedio de ventas por producto
    router.get('/promedioventaporproducto', (req, res) => {

        const sql = `SELECT 
        p.nombreProducto,
        AVG(hv.total_venta) AS Promedio_Ventas
    FROM 
        Hechos_Ventas hv
    JOIN 
        Dim_Producto p ON hv.id_producto = p.id_producto
    GROUP BY 
        p.nombreProducto
    ORDER BY 
        Promedio_Ventas DESC;`;
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla promedio de ventas por producto' });
            } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
            }
        });
        });  

    //Consulta de ventas por producto y por mes
    router.get('/ventasporproducto', (req, res) => {

        const sql = `SELECT 
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
        t.Anyo, t.Mes, Ventas_Totales DESC;`;
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla de ventas por producto' });
            } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
            }
        });
        });    
        
        //Consulta de Top 5 productos más vendidos por cantidad
    router.get('/top5masvendido', (req, res) => {

        const sql = `SELECT 
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
    `;
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla top 5 productos mas vendidos' });
            } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
            }
        });
        });    

        //Consulta de Ingresos Totales Mensuales
    router.get('/ingresostotalesmensuales', (req, res) => {

        const sql = `SELECT 
        CONCAT(DT.anyo, '-', LPAD(DT.mes, 2, '0')) AS Mes, 
        SUM(HV.total_venta) AS IngresosTotales 
    FROM 
        Hechos_Ventas HV
        JOIN Dim_Tiempo DT ON HV.id_tiempo = DT.id_tiempo
    GROUP BY 
        DT.anyo, DT.mes;
    `;
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla ingresos totales' });
            } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
            }
        });
        });

      //Consulta de Ingresos por producto
    router.get('/ingresosporproducto', (req, res) => {

        const sql = `SELECT 
        DP.nombreProducto, 
        SUM(HV.total_venta) AS IngresosPorProducto 
    FROM 
        Hechos_Ventas HV 
        JOIN Dim_Producto DP ON HV.id_producto = DP.id_producto 
    GROUP BY 
        DP.nombreProducto;`;
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla ingresos por producto' });
            } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
            }
        });
        });
        
    //Consulta de Frecuencia de Uso por Cliente
    router.get('/frecuenciadeuso', (req, res) => {

        const sql = `SELECT 
        DC.id_cliente, 
        COUNT(HV.id_venta) AS FrecuenciaUso 
    FROM 
        Dim_Cliente DC 
        JOIN Hechos_Ventas HV ON DC.id_cliente = HV.id_cliente 
    GROUP BY 
        DC.id_cliente;`;
    
        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla de frecuencia de uso' });
            } else {
            // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
            }
        });
        });
        
//Consulta de Productos/Servicios más Populares
router.get('/producServPopulares', (req, res) => {

    const sql = `SELECT 
    DP.nombreProducto, 
    SUM(HV.cantidad) AS TotalCantidad 
FROM 
    Hechos_Ventas HV 
    JOIN Dim_Producto DP ON HV.id_producto = DP.id_producto 
GROUP BY 
    DP.nombreProducto 
ORDER BY 
    TotalCantidad DESC;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
        if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla de Productos/Servicions Populares' });
        } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
        }
    });
    });

    return router;
};