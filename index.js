const express = require('express');
const app = express();

<<<<<<< HEAD
const { port, dbURI }    = require('./config/environment');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));
=======
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));

const { port, env, dbURI }    = require('./config/environment');
const router = require('./config/routes');
const bodyParser = require('body-parser');

>>>>>>> c395ccceb609acb68bfd79b04699e92d6816a4a7

mongoose.connect(dbURI, { useMongoClient: true });

const bodyParser = require('body-parser');
const router = require('./config/routes');


app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use('/api', router);

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));
