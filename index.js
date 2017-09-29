const express     = require('express');
const app         = express();
const { port }    = require('./config/environment');
const router = require('./config/routes');
const bodyParser = require('body-parser');

app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => console.log(`Express has started on port: ${port}`));
