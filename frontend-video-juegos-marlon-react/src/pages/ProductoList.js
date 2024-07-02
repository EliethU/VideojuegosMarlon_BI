import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Container, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaFileLines } from 'react-icons/fa6';

function VentaList({ Rol }) {
  const [ventas, setVentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState({});
  const [detalleVenta, setDetalleVenta] = useState([]);
  const [filtroNombreCliente, setFiltroNombreCliente] = useState('');
  const [ventasFiltradas, setVentasFiltradas] = useState([]);

  const openModal = (venta) => {
    setSelectedVenta(venta);
    setShowModal(true);
    loadDetalleVenta(venta.id_venta);
  };

  const loadVentas = () => {
    fetch('http://localhost:5000/crud/readVenta')
      .then((response) => response.json())
      .then((data) => {
        setVentas(data);
        setVentasFiltradas(data); // Inicialmente mostramos todas las ventas
      })
      .catch((error) => console.error('Error al obtener las ventas:', error));
  };

  const loadDetalleVenta = (idVenta) => {
    fetch(`http://localhost:5000/crud/readDetalleVenta/${idVenta}`)
      .then((response) => response.json())
      .then((data) => setDetalleVenta(data))
      .catch((error) => console.error('Error al obtener los detalles de la venta:', error));
  };

  useEffect(() => {
    loadVentas();
  }, []);

  useEffect(() => {
    // Filtrar las ventas cuando cambie el filtro por nombre de cliente
    const filteredVentas = ventas.filter(venta =>
      venta.nombreCliente.toLowerCase().includes(filtroNombreCliente.toLowerCase())
    );
    setVentasFiltradas(filteredVentas);
  }, [filtroNombreCliente, ventas]);

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleSearchChange = (event) => {
    setFiltroNombreCliente(event.target.value);
  };

  return (
    <div>
      <Header Rol={Rol} />

      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title className="mb-3">Listado de Ventas</Card.Title>

            <Row className="mb-3">
              <Col sm="6" md="6" lg="8">
                  <Form.Control
                    type="text"
                    placeholder="Buscar"
                    value={filtroNombreCliente}
                    onChange={handleSearchChange}
                  />
              </Col>
            </Row>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventasFiltradas.map((venta) => (
                  <tr key={venta.id_venta}>
                    <td>{venta.id_venta}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{formatDateForInput(venta.fecha)}</td>
                    <td className="d-flex justify-content-center">
                      <Button
                        variant="success"
                        onClick={() => openModal(venta)}
                        style={{ marginRight: '15px' }}
                      >
                        <FaFileLines />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>ID: {selectedVenta.id_venta}</Card.Title>
              <p>Cliente: {selectedVenta.nombreCliente}</p>
              <p>Fecha: {formatDateForInput(selectedVenta.fecha)}</p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID Detalle</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detalleVenta.map((detalle) => (
                    <tr key={detalle.id_detalle}>
                      <td>{detalle.id_detalle}</td>
                      <td>{detalle.nombreProducto}</td>
                      <td>{detalle.precio}</td>
                      <td>{detalle.cantidad}</td>
                      <td>{detalle.cantidad * detalle.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VentaList;