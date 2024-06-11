import React, { useEffect, useState } from 'react';  // Importación de React, useEffect y useState desde 'react'
import Header from '../components/Header';  // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import '../styles/App.css';  
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Estadisticas({ Rol }) {  // Declaración del componente Estadisticas con el argumento 'rol'

  const imprimirEstadisticas = () => {
    console.log("Imprimiendo estadísticas...");
    const input = document.getElementById('reporte-kardex');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
      pdf.save("reporte.pdf");
    });
  }

  return(
      <div>
      <Header Rol={ Rol } />  

      <Container className="margen-conten" id='espacio' responsive>

        <Row className="g-3">
          
          <Col sm="12" md="12" lg="12">
            <Card>
              <Card.Body>
                <Card.Title>Estado del almacen</Card.Title>

                <div id="reporte-kardex">
                  <iframe 
                    title="REPORTE KARDEX" 
                    width="1024" 
                    height="804" 
                    src="https://app.powerbi.com/view?r=eyJrIjoiMzkyNzM0OGYtYTgwOC00NmYzLTk2YWItNGI2ODg5M2JiODU0IiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9" 
                    frameBorder="0" 
                    allowFullScreen={true}
                  ></iframe>
                 </div>

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


export default Estadisticas;