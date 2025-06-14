require('dotenv').config(); // Move to the top
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY); // Debug log
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debug log

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const ideaRoutes = require('./routes/idea');
const analyticsRoutes = require('./routes/analytics');

const app = express();

console.log('Auth routes:', authRoutes);
console.log('Idea routes:', ideaRoutes);
console.log('Analytics routes:', analyticsRoutes);


connectDB();

app.use(cors({
origin: 'http://localhost:3000', 
  credentials: true,

}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/idea', ideaRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));