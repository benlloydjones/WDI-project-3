const express = require('express');
const app = express();

const { port, dbURI }    = require('./config/environment');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));

const cors = require('cors');
const router = require('./config/routes');
const bodyParser = require('body-parser');

mongoose.connect(dbURI, { useMongoClient: true });


const errorHandler = require('./lib/errorHandler');
const customResponses = require('./lib/customResponses');

app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(customResponses);

app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Express has started on port: ${port}`));
