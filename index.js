const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));

const { port, env, dbURI }    = require('./config/environment');
const router = require('./config/routes');
const bodyParser = require('body-parser');


mongoose.connect(dbURI, { useMongoClient: true });
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());

app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));
