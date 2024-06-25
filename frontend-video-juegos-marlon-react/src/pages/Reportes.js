import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Button, Row, Col, Card } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Chart from 'chart.js/auto';
import '../styles/App.css';
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com'
import * as XLSX from 'xlsx';
import { FaFileExcel  } from 'react-icons/fa6';


function Reportes({ Rol }) {
  // Estados para manejar los datos y las instancias de los gráficos
  const [productos, setProductos] = useState([]);
  const [estadoAlmacen, setEstadoAlmacen] = useState([]);
  const [myChart, setMyChart] = useState(null);
  const [categoryChart, setCategoryChart] = useState(null);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [revenueChart, setRevenueChart] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [productsChart, setProductsChart] = useState(null);
  const [customerGrowth, setCustomerGrowth] = useState([]);
  const [growthChart, setGrowthChart] = useState(null);

  const formatearEstadoAlmacen = (productos) => {
    return productos.map(producto => {
      return `Nombre: ${producto.nombreProducto}\nCantidad: ${producto.Stock}`;
    }).join('\n\n');
  };

  const enviarCorreo = () => {
    // Formateo de datos
    const EstadoAlmacenFormateado = formatearEstadoAlmacen(productos);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: 'Josnel',
      user_email: 'josnellopezdiaz@gmail.com',
      message: EstadoAlmacenFormateado,
    };

    // Envía el correo utilizando EmailJS
    emailjs.send('service_olge9ps', 'template_akdp4y6', data, 'nqxpxkx25L-0-cuBT')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
  };

  // Obtener los productos desde la API
  useEffect(() => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  // Crear el gráfico de barras para el estado del almacén
  useEffect(() => {
    if (productos.length > 0) {
      const ctx = document.getElementById('myChart');

      if (ctx) { // Verifica si el elemento existe en el DOM
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
    }
  }, [productos]);

  useEffect(() => {
    fetch('http://localhost:5000/estadisticas/estadoalmacen')
      .then((response) => response.json())
      .then((data) => setEstadoAlmacen(data))
      .catch((error) => console.error('Error al obtener los productos por categorìa:', error));
  }, []);


  //Excel
   const excelAlmacenCompleto = () => {
    console.log(estadoAlmacen);
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(estadoAlmacen);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estado');

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'AlmacenCompleto.xlsx');
  };


  // Obtener los productos por categoría
  useEffect(() => {
    fetch('http://localhost:5000/crud/productosPorCategoria')
      .then((response) => response.json())
      .then((data) => setProductosPorCategoria(data))
      .catch((error) => console.error('Error al obtener los productos por categorìa:', error));
  }, []);

  // Crear el gráfico de pastel para productos por categoría
  useEffect(() => {
    if (productosPorCategoria.length > 0) {
      const ctx = document.getElementById('myCategories');

      if (ctx) { 
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
    }
  }, [productosPorCategoria]);

  //Excel
  const exportarAExcel = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(productosPorCategoria);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos por categoria');

     // Generar y descargar el archivo Excel
     XLSX.writeFile(workbook, 'productosporcategoria.xlsx');
    };

  // Obtener los ingresos mensuales desde
  useEffect(() => {
    fetch('http://localhost:5000/estadisticas/ingresostotalesmensuales')
      .then((response) => response.json())
      .then((data) => setMonthlyRevenue(data))
      .catch((error) => console.error('Error al obtener los ingresos mensuales:', error));
  }, []);

  // Crear el gráfico de líneas para los ingresos mensuales
  useEffect(() => {
    if (monthlyRevenue.length > 0) {
      const ctx = document.getElementById('revenueChart');

      if (ctx) { 
        if (revenueChart !== null) {
          revenueChart.destroy();
        }

        const months = monthlyRevenue.map((item) => item.Mes);
        const revenue = monthlyRevenue.map((item) => item.IngresosTotales);

        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: months,
            datasets: [{
              label: 'Ingresos Mensuales',
              data: revenue,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
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

        setRevenueChart(chart);
      }
    }
  }, [monthlyRevenue]);

  // Obtener los productos más vendidos desde la API
  useEffect(() => {
    fetch('http://localhost:5000/estadisticas/productosmasvendidos')
      .then((response) => response.json())
      .then((data) => setTopProducts(data))
      .catch((error) => console.error('Error al obtener los productos más vendidos:', error));
  }, []);

  // Crear el gráfico de barras para productos más vendidos
  useEffect(() => {
    if (topProducts.length > 0) {
      const ctx = document.getElementById('productsChart');

      if (ctx) { // Verifica si el elemento existe en el DOM
        if (productsChart !== null) {
          productsChart.destroy();
        }

        const products = topProducts.map((item) => item.nombreProducto);
        const revenue = topProducts.map((item) => item.IngresosPorProducto);

        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: products,
            datasets: [{
              label: 'Ingresos por Producto',
              data: revenue,
              backgroundColor: 'rgba(153, 102, 255, 0.5)',
              borderColor: 'rgba(153, 102, 255, 1)',
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

        setProductsChart(chart);
      }
    }
  }, [topProducts]);

 //Verificar este grafico
 // Obtener el crecimiento de clientes
  useEffect(() => {
  fetch('http://localhost:5000/estadisticas/frecuenciadeuso')
    .then((response) => response.json())
    .then((data) => {
      console.log('Datos de crecimiento de clientes:', data);
      setCustomerGrowth(data);
    })
    .catch((error) => console.error('Error al obtener el crecimiento de clientes:', error));
}, []);


// Crear el gráfico de líneas para el crecimiento de clientes
useEffect(() => {
  if (customerGrowth.length > 0) {
    const ctx = document.getElementById('growthChart');

    if (ctx) { // Verifica si el elemento existe en el DOM
      if (growthChart !== null) {
        growthChart.destroy();
      }

      // Aquí asumimos que la API devuelve una lista de objetos con propiedades 'Mes' y 'NuevosClientes'
      const months = customerGrowth.map((item) => item.Mes);
      const customers = customerGrowth.map((item) => item.NuevosClientes);

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: 'Nuevos Clientes',
            data: customers,
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            fill: false // Esto asegura que el área debajo de la línea no se rellene
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mes'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Nuevos Clientes'
              }
            }
          }
        }
      });

      setGrowthChart(chart);
    }
  }
}, [customerGrowth]);

 // Generar reporte en PDF del gráfico de pastel
const generarReportePastel = async () => {
  try {
    // Asegúrate de que html2canvas y jsPDF estén disponibles
    const canvas = await html2canvas(document.getElementById('myCategories'));
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const imgWidth = pageWidth - 40; // Ajusta el ancho de la imagen
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const xPos = 20; // Ajusta la posición X

    const response = await fetch('http://localhost:5000/crud/productosPorCategoria');
    const productosPorCategoria = await response.json();

    pdf.setTextColor(128, 0, 128);
    pdf.text("Reporte de los productos por categoría", 20, 15);
    pdf.setTextColor(0, 0, 0);

    // Añadir la cantidad de productos por cada categoría en el encabezado del PDF
    const columns = ["Categoria", "Cantidad de productos"];
    const rows = productosPorCategoria.map((producto) => [producto.nombre, producto.cantidad]);

    // Verifica si autoTable está disponible
    if (pdf.autoTable) {
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
    } else {
      console.error('autoTable no está disponible en jsPDF');
    }

    pdf.addPage();
    pdf.addImage(imgData, xPos, 20, imgWidth, imgHeight);

    pdf.save("reporte_pastel.pdf");
  } catch (error) {
    console.error('Error al generar el reporte de pastel', error);
  }
};

  // Generar reporte en PDF del reporte completo
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

//Generar reporte en PDF del gráfico de ingresos mensuales  
const generarReporteIngresosMensuales = () => {
  const input = document.getElementById('revenueChart');

  html2canvas(input, { allowTaint: true }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(canvas);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('ReporteIngresosMensuales.pdf');
  });
};


  //Generacion de botones
  return (
    <div>
      <Header Rol={Rol} />
      <Row className="margen-contenedor text-center g-3">
        <Col sm="12" md="12" lg="12">
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
              <Button variant="secondary" onClick={enviarCorreo} className="mt-2">
                Enviar por Correo
              </Button>
              <Button variant="success" onClick={excelAlmacenCompleto} className="m-1">
                <FaFileExcel style={{ color: 'white' }} />
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col sm="12" md="12" lg="6">
        <Card>
          <Card.Body>
            <Card.Title>Productos por Categoría</Card.Title>
            <canvas id="myCategories" height="120"></canvas>
            <Button onClick={generarReportePastel} className="mt-3">
            Generar reporte de gráfico de pastel
            </Button>
            <Button variant="success" onClick={exportarAExcel} className="m-1">
                <FaFileExcel style={{ color: 'white' }} />
              </Button>
          </Card.Body>
          </Card>
        </Col>

        <Col sm="12" md="12" lg="6">
        <Card>
          <Card.Body>
            <Card.Title>Ingresos Mensuales</Card.Title>
          <div id="myCategories">
            <canvas id="revenueChart" height="300"></canvas>
          </div>
            <Button onClick={generarReporteIngresosMensuales} className="mt-3">
            Generar reporte de ingresos mensuales
            </Button>
          </Card.Body>
        </Card>
        </Col>

        <Col sm="12" md="12" lg="6">
          <Card>
            <Card.Body>
              <Card.Title>Productos Más Vendidos</Card.Title>
              <div id="myCategories">
            <canvas id="revenueChart" height="300"></canvas>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm="12" md="12" lg="6">
          <Card>
            <Card.Body>
              <Card.Title>Crecimiento de Clientes</Card.Title>
              <canvas id="growthChart" height="300"></canvas>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Reportes;