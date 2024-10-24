
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inisialisasi Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Simulasi database pengiriman barang
let shipments = [
  {
    id: 1,
    sender: {
      name: "John Doe",
      address: "Jl. Merdeka No. 10, Jakarta",
      contact: "081234567890"
    },
    recipient: {
      name: "Jane Doe",
      address: "Jl. Sudirman No. 123, Bandung",
      contact: "081234567891"
    },
    packageDetails: {
      weight: "2kg",
      dimensions: "20x30x15cm",
      type: "Dokumen",
      description: "Berkas penting untuk proyek"
    },
    tracking: {
      status: "Dalam Perjalanan",
      currentLocation: {
        latitude: -6.200000,
        longitude: 106.816666,
        city: "Jakarta",
        timestamp: "2024-10-24T10:30:00Z"
      },
      history: [
        {
          status: "Diterima di Gudang Jakarta",
          location: "Gudang Jakarta",
          timestamp: "2024-10-24T08:00:00Z"
        },
        {
          status: "Diambil oleh kurir",
          location: "Gudang Jakarta",
          timestamp: "2024-10-24T09:00:00Z"
        }
      ]
    },
    createdAt: "2024-10-23T07:00:00Z",
    estimatedDelivery: "2024-10-25T18:00:00Z",
    deliveryType: "Express"
  },
];

// Rute untuk mendapatkan semua pengiriman
app.get('/shipments', (req, res) => {
  res.json(shipments);
});

// Rute untuk mendapatkan detail pengiriman berdasarkan ID
app.get('/shipments/:id', (req, res) => {
  const shipment = shipments.find(s => s.id === parseInt(req.params.id));
  if (shipment) {
    res.json(shipment);
  } else {
    res.status(404).send('Shipment not found');
  }
});

// Rute untuk membuat pengiriman baru
app.post('/shipments', (req, res) => {
  const newShipment = {
    id: shipments.length + 1,
    sender: req.body.sender,
    recipient: req.body.recipient,
    packageDetails: req.body.packageDetails,
    tracking: {
      status: "Dalam Perjalanan",
      currentLocation: req.body.currentLocation || null,
      history: []
    },
    createdAt: new Date(),
    estimatedDelivery: req.body.estimatedDelivery,
    deliveryType: req.body.deliveryType
  };
  shipments.push(newShipment);
  res.json(newShipment);
});

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
