const express = require('express');
const app = express();
const cors = require('cors');
const productRoutes = require("./routes/product.routes");

// Rutas

// Middlewares para cliente
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use("/api/products",productRoutes);
// Uso de rutas

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));
