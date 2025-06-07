const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes');
const eventRoutes = require('../routes/eventRoutes');

dotenv.config();

const app = express();
app.use(express.json());
const dbURI = process.env.MONGODB_URI; 

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error('DB Connection Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes); 
app.get('/', (req, res) => {
    res.send('API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});