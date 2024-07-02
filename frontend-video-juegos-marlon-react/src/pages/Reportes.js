import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Button, Row, Col, Card } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';
import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa6';
import { FaRegFilePdf } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import 'jspdf-autotable';


export function Reportes({ Rol }) {
  // Estados para manejar los datos y las instancias de los gráficos
  const [productos, setProductos] = useState([]);
  const [estadoAlmacen, setEstadoAlmacen] = useState([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [ingresostotalesmensuales, setingresostotalesmensuales] = useState([]);
  const [ventasPorAnyo, setVentasPorAnyo] = useState([]);
  const [ventasPorProducto, setVentasPorProducto] = useState([]);
  const [top5MasVendidos, setTop5MasVendidos] = useState([]);

  const [myChart, setMyChart] = useState(null);
  const [categoryChart, setCategoryChart] = useState(null);
  const [revenueChart, setRevenueChart] = useState(null); 
  const [myChart4, setMyChart4] = useState(null);
  const [myChart5, setMyChart5] = useState(null);
  const [myChart6, setMyChart6] = useState(null);

  //Estado de almacen

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

  //Formatear estado de almace completo
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

  useEffect(() => {
    fetch('http://localhost:5000/estadisticas/estadoalmacen')
      .then((response) => response.json())
      .then((data) => setEstadoAlmacen(data))
      .catch((error) => console.error('Error al obtener los productos por categorìa:', error));
  }, []);

  //Exportacion de excel almacen completo
  const excelAlmacenCompleto = () => {
    console.log(estadoAlmacen);
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(estadoAlmacen);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estado');

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'AlmacenCompleto.xlsx');
  };

   // Generar reporte en PDF del reporte de estado completo
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

  //Correo para Grafico de pastel de los productos por categoria
  const formatearProductosCategoria = (productosPorCategoria) => {
    return productosPorCategoria.map((productosPorCategoria) => {
      return `Categoria: ${productosPorCategoria.Categoria}\nMes: ${productosPorCategoria.cantidadproducto}`;
    }).join('\n\n');
  };

  const enviarCorreo1 = () => {
    // Formateo de datos
    const EstadoCategoriaFormateado = formatearProductosCategoria(productosPorCategoria);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: 'Josnel',
      user_email: 'josnellopezdiaz@gmail.com',
      message: EstadoCategoriaFormateado,
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

  //Excel
  const excelProductosCategoria = () => {
    console.log(productosPorCategoria);
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(productosPorCategoria);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos por categoria');

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'ProductosCategoria.xlsx');
  };

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

  // Ingresos Totales

  // Obtener los ingresos totales mensuales desde la API
  useEffect(() => {
    fetch('http://localhost:5000/estadisticas/ingresostotalesmensuales')
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de ingresos totales mensuales:', data);
        setingresostotalesmensuales(data);
      })
      .catch((error) => console.error('Error al obtener los ingresos totales mensuales:', error));
  }, []);

  // Crear el gráfico de líneas para ingresos totales mensuales
  useEffect(() => {
    if (ingresostotalesmensuales.length > 0) {
      const ctx = document.getElementById('myRevenues');

      if (ctx) { // Verifica si el elemento existe en el DOM
        if (revenueChart !== null) {
          revenueChart.destroy();
        }

        const meses = ingresostotalesmensuales.map((ingreso) => ingreso.Mes);
        const ingresos = ingresostotalesmensuales.map((ingreso) => ingreso.IngresosTotales);

        const ingresosMensuales = new Chart(ctx, {
          type: 'line',
          data: {
            labels: meses,
            datasets: [{
              label: 'Ingresos Totales Mensuales',
              data: ingresos,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
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

        setRevenueChart(ingresosMensuales);
      }
    }
  }, [ingresostotalesmensuales]);

  //Correo para los ingresos mensuales
  const formatearIngresosMensuales = (ingresostotalesmensuales) => {
    return ingresostotalesmensuales.map((ingreso) => {
      return `Ingresos: ${ingreso.IngresosTotales}\nMes: ${ingreso.Mes}`;
    }).join('\n\n');
  };

  const enviarCorreo2 = () => {
    // Formateo de datos
    const ingresosTotalesMensualesFormateados = formatearIngresosMensuales(ingresostotalesmensuales);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: 'Josnel',
      user_email: 'josnellopezdiaz@gmail.com',
      message: ingresosTotalesMensualesFormateados,
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

   //Excel
  const excelIngresosMensuales = () => {
    console.log(ingresostotalesmensuales);
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(ingresostotalesmensuales);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ingresos mensuales');

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'IngresosMensuales.xlsx');
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

//Ventas por año
useEffect(() => {
  fetch('http://localhost:5000/estadisticas/ventasporanyo')
    .then((response) => response.json())
    .then((data) => setVentasPorAnyo(data))
    .catch((error) => console.error('Error al obtener las ventas por año:', error));
}, []);

// Crear el gráfico de barras para ventas por año
useEffect(() => {
  if (ventasPorAnyo.length > 0) {
    const ctx = document.getElementById('myChart4');

    if (ctx) { // Verifica si el elemento existe en el DOM
      if (myChart4 !== null) {
        myChart4.destroy();
      }

      const anyos = ventasPorAnyo.map((venta) => venta.Anyo);
      const ventas = ventasPorAnyo.map((venta) => venta.Ventas_totales);

      const ventasAnuales = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: anyos,
          datasets: [{
            label: 'Ventas Totales',
            data: ventas,
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

      setMyChart4(ventasAnuales);
    }
  }
}, [ventasPorAnyo]);

//Envio de correo para las ventas por año
const formatearVentasAño = (ventasPorAnyo) => {
  return ventasPorAnyo.map((venta) => {
    return `Cantidad: ${venta.Ventas_totales}\nAño: ${venta.Anyo}`;
  }).join('\n\n');
};

const enviarCorreo3 = () => {
  // Formateo de datos
  const VentasPorAnyoFormateados = formatearVentasAño(ventasPorAnyo);

  // Datos de ejemplo (reemplaza con tus datos reales)
  const data = {
    to_name: 'Josnel',
    user_email: 'josnellopezdiaz@gmail.com',
    message: VentasPorAnyoFormateados,
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

//Excel de las ventas por año
const excelVentasAnyo = () => {
  console.log(ventasPorAnyo);
  // Convertir los datos JSON a una hoja de trabajo de Excel
  const worksheet = XLSX.utils.json_to_sheet(ventasPorAnyo);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas por año');

  // Generar y descargar el archivo Excel
  XLSX.writeFile(workbook, 'VentasAño.xlsx');
};

// Generar reporte en PDF del gráfico de ventas por año
const generarReporteVentasAnyo = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('myChart4'));
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const imgWidth = pageWidth - 40; // Ajusta el ancho de la imagen
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const xPos = 20; // Ajusta la posición X
    
    const response = await fetch('http://localhost:5000/estadisticas/ventasporanyo');
    const ventasPorAnyo = await response.json();
    
    pdf.setTextColor(128, 0, 128);
    pdf.text("Reporte de Ventas por Año", 20, 15);
    pdf.setTextColor(0, 0, 0);
    
    const columns = ["Año", "Ventas Totales"];
    const rows = ventasPorAnyo.map((venta) => [venta.Anyo, venta.Ventas_totales]);
    
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
    
    pdf.addPage();
    pdf.addImage(imgData, xPos, 20, imgWidth, imgHeight);
    
    pdf.save("reporte_ventas_anyo.pdf");
  } catch (error) {
    console.error('Error al generar el reporte de ventas por año:', error);
  }
};

//Ventas por productos
// Obtener las ventas totales por producto desde la API
useEffect(() => {
  fetch('http://localhost:5000/estadisticas/ventasporproducto')
    .then((response) => response.json())
    .then((data) => setVentasPorProducto(data))
    .catch((error) => console.error('Error al obtener las ventas totales por producto:', error));
}, []);

// Crear el gráfico de barras para ventas por producto
useEffect(() => {
  if (ventasPorProducto.length > 0) {
    const ctx = document.getElementById('myChart5');

    if (ctx) { // Verifica si el elemento existe en el DOM
      if (myChart5 !== null) {
        myChart5.destroy();
      }

      const anyos = ventasPorProducto.map((venta) => venta.nombreProducto);
      const ventas = ventasPorAnyo.map((venta) => venta.Ventas_totales);

      const ventasProductos = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: anyos,
          datasets: [{
            label: 'Ventas por Productos',
            data: ventas,
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

      setMyChart5(ventasProductos);
    }
  }
}, [ventasPorProducto]);

//Envio de correo para las ventas por producto
const formatearVentasProducto = (ventasPorProducto) => {
  return ventasPorProducto.map((venta) => {
    return `Cantidad: ${venta.Ventas_totales}\nProducto: ${venta.nombreProducto}`;
  }).join('\n\n');
};

const enviarCorreo4 = () => {
  // Formateo de datos
  const VentasPorProductoFormateados = formatearVentasProducto(ventasPorProducto);

  // Datos de ejemplo (reemplaza con tus datos reales)
  const data = {
    to_name: 'Josnel',
    user_email: 'josnellopezdiaz@gmail.com',
    message: VentasPorProductoFormateados,
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

//Excel de las ventas por año
const excelVentasProducto = () => {
  console.log(ventasPorProducto);
  // Convertir los datos JSON a una hoja de trabajo de Excel
  const worksheet = XLSX.utils.json_to_sheet(ventasPorProducto);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas por producto');

  // Generar y descargar el archivo Excel
  XLSX.writeFile(workbook, 'VentasProducto.xlsx');
};

// Generar reporte en PDF del gráfico de ventas por producto
const generarReporteVentasProducto = async () => {
  try {
    const canvas = await html2canvas(document.getElementById('myChart4'));
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const imgWidth = pageWidth - 40; // Ajusta el ancho de la imagen
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const xPos = 20; // Ajusta la posición X
    
    const response = await fetch('http://localhost:5000/estadisticas/ventasporproducto');
    const ventasPorProducto = await response.json();
    
    pdf.setTextColor(128, 0, 128);
    pdf.text("Reporte de Ventas por producto", 20, 15);
    pdf.setTextColor(0, 0, 0);
    
    const columns = ["Productos", "Ventas Totales"];
    const rows = ventasPorProducto.map((venta) => [venta.nombresProducto, venta.Ventas_totales]);
    
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
    
    pdf.addPage();
    pdf.addImage(imgData, xPos, 20, imgWidth, imgHeight);
    
    pdf.save("reporte_ventas_producto.pdf");
  } catch (error) {
    console.error('Error al generar el reporte de ventas por producto:', error);
  }
};

//Top 5 productos mas vendidos
// Obtener datos del top 5 productos más vendidos
useEffect(() => {
  const obtenerTop5MasVendidos = async () => {
    try {
      const response = await fetch('http://localhost:5000/estadisticas/top5masvendidos');
      const data = await response.json();
      setTop5MasVendidos(data);
    } catch (error) {
      console.error('Error al obtener el top 5 productos más vendidos:', error);
    }
  };

  obtenerTop5MasVendidos();
}, []);

// Generar gráfico de top 5 productos más vendidos
useEffect(() => {
  if (top5MasVendidos.length > 0) {
    const ctx = document.getElementById('top5Chart').getContext('2d');
    if (myChart6) {
      myChart6.destroy();
    }
    const nombresProductos = top5MasVendidos.map(producto => producto.nombreProducto);
    const ventas = top5MasVendidos.map(producto => producto.cantidadVendida);

    const dynamicColors = nombresProductos.map(() => {
      const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
      return randomColor;
    });

    const top5Chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: nombresProductos,
        datasets: [{
          label: 'Cantidad Vendida',
          data: ventas,
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

    setMyChart6(top5Chart);
  }
}, [top5MasVendidos]);

//Envio de correo top 5 productos mas vendidos
const formatearTop5 = (top5masvendido) => {
  return top5masvendido.map((producto) => {
    return `Cantidad vendida: ${producto.Cantidad_Total_Vendida}\nProducto: ${producto.nombreProducto}`;
  }).join('\n\n');
};

const enviarCorreo5 = () => {
  // Formateo de datos
  const Top5Formateados = formatearTop5(productos);

  // Datos de ejemplo (reemplaza con tus datos reales)
  const data = {
    to_name: 'Josnel',
    user_email: 'josnellopezdiaz@gmail.com',
    message: Top5Formateados,
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

//Excel del top 5 productos mas vendidos
const excelTop5 = () => {
  console.log(productos);
  // Convertir los datos JSON a una hoja de trabajo de Excel
  const worksheet = XLSX.utils.json_to_sheet(productos);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Top 5 mas vendido');

  // Generar y descargar el archivo Excel
  XLSX.writeFile(workbook, 'Top5.xlsx');
};

// Generar reporte en PDF del top 5 productos más vendidos
const generarReporteTop5MasVendidos = async () => {
  try {
    const canvas = document.getElementById('top5Chart');
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const xPos = 20;

    pdf.setTextColor(128, 0, 128);
    pdf.text("Reporte de los Top 5 productos más vendidos", 20, 15);
    pdf.setTextColor(0, 0, 0);

    pdf.addImage(imgData, 'PNG', xPos, 25, imgWidth, imgHeight);

    pdf.save('reporte_top5_mas_vendidos.pdf');
  } catch (error) {
    console.error('Error al generar el reporte de Top 5 productos más vendidos:', error);
  }
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
              <canvas id="myChart" height="120"></canvas>
              <Button onClick={generarReporteCompleto} className="m-3 mb-3">
              <FaRegFilePdf style={{ color: 'white' }}/>
              </Button>
              <Button variant="secondary" onClick={enviarCorreo} className="mt-3 mb-3">
              <SiGmail style={{ color: 'white' }} />
              </Button>
              <Button variant="success" onClick={excelAlmacenCompleto} className="m-3 mb-3">
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
            <Button onClick={generarReportePastel} className="m-3 mb-3">
            <FaRegFilePdf style={{ color: 'white' }}/>
            </Button>
            <Button variant="secondary" onClick={enviarCorreo1} className="mt-3 mb-3">
              <SiGmail style={{ color: 'white' }} />
              </Button>
            <Button variant="success" onClick={excelProductosCategoria} className="m-3">
                <FaFileExcel style={{ color: 'white' }} />
              </Button>
          </Card.Body>
          </Card>
        </Col>

        <Col sm="12" md="12" lg="6">
        <Card>
          <Card.Body>
            <Card.Title>Ingresos Mensuales</Card.Title>
            <canvas id="revenueChart" height="120"></canvas>
          <Button onClick={generarReporteIngresosMensuales} className="m-3 mb-3">
            <FaRegFilePdf style={{ color: 'white' }}/>
            </Button>
          <Button variant="secondary" onClick={enviarCorreo2} className="mt-3 mb-3">
              <SiGmail style={{ color: 'white' }} />
          </Button>
          <Button variant="success" onClick={excelIngresosMensuales} className="m-3">
              <FaFileExcel style={{ color: 'white' }} />
          </Button>
          </Card.Body>
        </Card>
        </Col>

        <Col sm="12" md="12" lg="6">
        <Card>
          <Card.Body>
            <Card.Title className='title'>Ventas Totales por Año</Card.Title>
              <canvas id="myChart4"  height="120"></canvas>
            </Card.Body>
            <Card.Body>
            <Button onClick={generarReporteVentasAnyo} className="m-3 mb-3">
            <FaRegFilePdf style={{ color: 'white' }}/>
            </Button> 
              <Button variant="secondary" onClick={enviarCorreo3} className="mt-3 mb-3">
              <SiGmail style={{ color: 'white' }} />
              </Button> 
              <Button variant="success" onClick={excelVentasAnyo} className="m-3">
              <FaFileExcel style={{ color: 'white' }} />
          </Button>                      
            </Card.Body>
          </Card>
        </Col>

        <Col sm="12" md="12" lg="6">
        <Card>
          <Card.Body>
            <Card.Title className='title'>Ventas Totales por Productos</Card.Title>
              <canvas id="myChart5"  height="120"></canvas>
            </Card.Body>
            <Card.Body>
            <Button onClick={generarReporteVentasProducto} className="m-3 mb-3">
            <FaRegFilePdf style={{ color: 'white' }}/>
            </Button> 
              <Button variant="secondary" onClick={enviarCorreo4} className="mt-3 mb-3">
              <SiGmail style={{ color: 'white' }} />
              </Button>  
              <Button variant="success" onClick={excelVentasProducto} className="m-3">
              <FaFileExcel style={{ color: 'white' }} />
          </Button>                      
            </Card.Body>
          </Card>
        </Col>

        <Col sm="12" md="12" lg="6">
        <Card>
          <Card.Body>
            <Card.Title className='title'>Top 5 Productos más vendidos</Card.Title>
              <canvas id="myChart6"  height="120"></canvas>
            </Card.Body>
            <Card.Body>
            <Button onClick={generarReporteTop5MasVendidos} className="m-3 mb-3">
            <FaRegFilePdf style={{ color: 'white' }}/>
            </Button> 
              <Button variant="secondary" onClick={enviarCorreo5} className="mt-3 mb-3">
              <SiGmail style={{ color: 'white' }} />
              </Button> 
              <Button variant="success" onClick={excelTop5} className="m-3">
              <FaFileExcel style={{ color: 'white' }} />
          </Button>                      
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}


export default Reportes;
