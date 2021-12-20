const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { SocketServer } = require('./SocketServer');
const { createServer } = require('http');
const { Server } = require('socket.io');

dotenv.config({
  path: './config/.env'
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

const http = createServer(app);
const io = new Server(http);
module.exports = io;

io.on('connection', socket => SocketServer(socket));

app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/category', require('./routes/category.route'));
app.use('/api/v1/blog', require('./routes/blog.route'));
app.use('/api/v1/user', require('./routes/user.route'));
app.use('/api/v1/comment', require('./routes/comment.route'));

connectDB();
http.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));