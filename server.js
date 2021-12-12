const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({
  path: './config/.env'
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/category', require('./routes/category.route'));
app.use('/api/v1/blog', require('./routes/blog.route'));

connectDB();
app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));