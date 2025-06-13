import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";


import comidaRoutes from './routes/comidas.js';
import contactosRoutes from "./routes/contactos.js"

import paqueteRoutes from "./routes/paquete.js";
import adminRoutes from "./routes/admins.js";
import hotelesRoutes from "./routes/hotels.js";
import comentarioRoutes from "./routes/comentarios.js";
import excursionesRoutes from "./routes/excursiones.js";
import { crearRolesPredeterminados } from "./config/createRoles.js";
import swaggerJSDOCs from "./swaggerConfig.js";
import autentificacionesRoutes from "./routes/autenticación_routes.js";
import { crearadminPredeterminado } from "./config/crearAdminPredeterminado.js";
import clientesRoutes from "./routes/usuarios.js"
import connectDB from "./config/config.js";
import errorHandler from './middleware/errorHandler.js';
import transporteRoutes from "./routes/transportes.js"
import actividadRoutes from './routes/actividades.js';
import reservasRoutes from './routes/reservas.js';
import multer from 'multer';

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Configuración de Multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadsDir = path.join(__dirname, 'uploads'); // ⚠️ Está en src/uploads
app.use('/uploads', express.static(uploadsDir));


console.log('🗂️ Sirviendo imágenes desde:', uploadsDir);
try {
  console.log('📂 Contenido de uploads:', fs.readdirSync(uploadsDir));
} catch (err) {
  console.error('❌ No se puede acceder a uploads:', err.message);
}

const upload = multer({ dest: uploadsDir });
// Inicialización de roles y admin
crearRolesPredeterminados();
crearadminPredeterminado();

// Rutas para la API
app.use('/api', comidaRoutes);
app.use("/api/autentificaciones", autentificacionesRoutes);
app.use("/api", reservasRoutes);
app.use("/api/hoteles", hotelesRoutes);
app.use("/api", adminRoutes);
app.use("/api", comentarioRoutes);
app.use('/api/excursiones', excursionesRoutes);  // Más específico primero
app.use('/api/paquetes', paqueteRoutes); 
app.use("/api", clientesRoutes);
app.use("/api", contactosRoutes);
app.use("/api", transporteRoutes);
app.use('/api', actividadRoutes);
app.use('/api/reservas', reservasRoutes);
// Ruta para subir imágenes de hoteles
app.post('/hotels', upload.single('image'), (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file;
  res.json({
    message: 'Hotel agregado exitosamente',
    hotelData: { name, description, price, image }
  });
});
app.use(errorHandler);

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.send("<h1>Bienvenido a la API de SGIR</h1>");
});
const port = process.env.PORT || 5000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await crearRolesPredeterminados();
    await crearadminPredeterminado();
    app.listen(port, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${port}`);
      swaggerJSDOCs(app, port);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

iniciarServidor();