import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Button, Row, Col, Card } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Chart from 'chart.js/auto';
import '../styles/App.css';
import Footer from '../components/Footer';
import html2canvas from 'html2canvas';

function Estadisticas({ Rol }) {

  const [productos, setProductos] = useState([]);
  const [myChart, setMyChart] = useState(null);
  const [categoryChart, setCategoryChart] = useState(null);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  useEffect(() => {
    if (productos.length > 0) {
      const ctx = document.getElementById('myChart');

      if (myChart !== null) {
        myChart.destroy();
      }

      const nombresProductos = productos.map((producto) => producto.nombreProducto);
      const stokcs = productos.map((producto) => producto.Stock);

      const dynamicColors = stokcs.map(() => {
        const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
        return randomColor;
      });

      const almacen = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nombresProductos,
          datasets: [{
            label: 'Cantidad disponible',
            data: stokcs,
            backgroundColor: dynamicColors,
            borderColor: dynamicColors.map(color => color.replace('0.5', '1')),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      setMyChart(almacen);
    }
  }, [productos]);

  useEffect(() => {
    fetch('http://localhost:5000/crud/productosPorCategoria')
      .then((response) => response.json())
      .then((data) => setProductosPorCategoria(data))
      .catch((error) => console.error('Error al obtener los productos por categorìa:', error));
  }, []);

  useEffect(() => {
    if (productosPorCategoria.length > 0) {
      const ctx = document.getElementById('myCategories');

      if (categoryChart !== null) {
        categoryChart.destroy();
      }

      const labels = productosPorCategoria.map((Categoria) => Categoria.nombre);
      const data = productosPorCategoria.map((Categoria) => Categoria.cantidadproducto);

      const categorias = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de productos por categoria',
            data: data,
            backgroundColor: [
              'rgba(255,99,132,0.5)',
              'rgba(54,162,235,0.5)',
              'rgba(255,206,86,0.5)',
              'rgba(75,192,192,0.5)',
              'rgba(153,102,255,0.5)',
              'rgba(255,159,64,0.5)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54,162,235,1)',
              'rgba(255,206,86,1)',
              'rgba(75,192,192,1)',
              'rgba(153,102,255,1)',
              'rgba(255,159,64,1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Cantidad de productos por categoría'
            }
          }
        }
      });
      setCategoryChart(categorias);
    }
  }, [productosPorCategoria]);

  
  const generarReportePie = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('myCategories'));
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('reporte_pastel.pdf');
    } catch (error) {
      console.error('Error al generar el reporte del gráfico de pie:', error);
    }
  };

  const generarReporteCompleto = async () => {
    try {
      const response = await fetch('http://localhost:5000/crud/readproducto');
      const productos = await response.json();

      const pdf = new jsPDF();
      pdf.setTextColor(128, 0, 128);
      pdf.text("Reporte del Estado de Almacén", 20, 15);
      pdf.setTextColor(0, 0, 0);

      const columns = ["Nombre", "Cantidad"];
      const rows = productos.map((producto) => [producto.nombreProducto, producto.Stock]);

      pdf.autoTable({
        head: [columns],
        body: rows,
        startY: 25,
        margin: { top: 15 },
        styles: {
          lineColor: [0, 0, 0],
          lineWidth: 0.5,
        },
      });

    
      const canvas = await html2canvas(document.getElementById('myChart'));
      const imgData = canvas.toDataURL('image/png');
      const pageWidth = pdf.internal.pageSize.width;
      const imgWidth = pageWidth - 40; // Ajusta el ancho de la imagen
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const xPos = 20; // Ajusta la posición X

      pdf.addPage();
      pdf.addImage(imgData, xPos, 20, imgWidth, imgHeight);

      pdf.save("reporte_almacen_completo.pdf");
    } catch (error) {
      console.error('Error al generar el reporte completo:', error);
    }
  };

  return (
    <div>
      <Header Rol={Rol} />
      <Row className="margen-contenedor text-center g-3">
        <Col sm="6" md="6" lg="12">
          <Card>
            <Card.Body>
              <Card.Title>Estado del almacén</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col sm="12" md="12" lg="6">
          <Card>
            <Card.Body>
              <Card.Title>Estado del almacén</Card.Title>
              <canvas id="myChart" height="300"></canvas>
              <Button onClick={generarReporteCompleto} className="mt-3">
                Generar reporte completo
              </Button>
            </Card.Body>
          </Card>
        </Col>


        <Col sm="12" md="12" lg="6">
          <Card>
            <Card.Body>
              <Card.Title>Productos por Categoría</Card.Title>
              <canvas id="myCategories" height="120"></canvas>
              <Button onClick={generarReportePie} className="mt-3">
                Generar reporte de gráfico de pastel
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Estadisticas;
