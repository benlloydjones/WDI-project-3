const express = require('express');
const app = express();
const { port, env, dbURI }    = require('./config/environment');
mongoose.plugin(require('./lib/globalToJSON'));
const router = require('./config/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(dbURI, { useMongoClient: true });
app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => console.log(`Express has started on port: ${port}`));
