const express = require('express');
const cors = require('cors');
const plantsRoutes = require('./routes/plants.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', plantsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});