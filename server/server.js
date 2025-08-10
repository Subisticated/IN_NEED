require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital & Donor Coordination API',
      version: '1.0.0',
      description: 'API documentation for Hospital & Donor Coordination Platform',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./routes/*.js', './models/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
connectDB();

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/alive-organs', require('./routes/aliveOrgans'));
app.use('/api/deceased-organs', require('./routes/deceasedOrgans'));
app.use('/api/blood', require('./routes/blood'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/donor', require('./routes/donor'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
