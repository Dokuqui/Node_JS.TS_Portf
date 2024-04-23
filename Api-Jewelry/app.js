const express = require('express');

const app = express();
const { sequelize } = require('./models');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./config/swaggerConfig');
const jewelryRoutes = require('./routes/jewelry');
const locationRoutes = require('./routes/location');

app.use(express.json());
app.use(express.static('public'));

sequelize.sync({ force: false }).then(() => {
    console.log('Models had synchronized with databases')
});

app.use('/jewelry', jewelryRoutes);
app.use('/location', locationRoutes);
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '../public/index.html')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});