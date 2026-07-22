require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);


app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'RyokoAI backend is live and routing traffic!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});