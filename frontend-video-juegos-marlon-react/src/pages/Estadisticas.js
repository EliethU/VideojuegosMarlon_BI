import React, { useEffect, useState } from 'react';  // Importación de React, useEffect y useState desde 'react'
import Header from '../components/Header';  // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import '../styles/App.css';  

function Estadisticas({ Rol }) {  // Declaración del componente Estadisticas con el argumento 'rol'

    const imprimirEstadisticas = () => {
    console.log("Imprimiendo estadísticas...");
    }

    return(
        <div>
        <Header Rol={ Rol } />  

        <Container className="margen-conten" responsive>

        <Row className="g-3">
        
            <Col sm="12" md="12" lg="12">
            <Card>
                <Card.Body>
                <Card.Title>Estado del almacen</Card.Title>

                <iframe title="REPORTE KARDEX" width="1024" height="804" src="https://app.powerbi.com/reportEmbed?reportId=de8f94f4-1d36-4bca-a0ad-7921e200fa21&autoAuth=true&ctid=e47646fe-da27-4518-8436-5f8b158ba127" frameborder="0" allowFullScreen="true"></iframe>

                <Button onClick={imprimirEstadisticas}>
                    Generar reporte con imagen
                </Button>
                </Card.Body>
            </Card>
            </Col>

        </Row>
        </Container>

        </div>
        );
}

  export default Estadisticas; // Exporta el componente Estadisticas para su uso en otras partes de la aplicación  