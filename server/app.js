const express = require('express');
const mongoose = require('mongoose');
const bugsRouter = require('./routes/bugs');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugsRouter);

// Error handler (should be last)
app.use(errorHandler);

module.exports = app; 