const express = require('express');
const logger = require('morgan');
const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);

app.listen(port, () => { console.log('Server running 🤙') });