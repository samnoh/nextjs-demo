const express = require('express');
const next = require('next');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';
const port = prod ? parseInt(process.env.PORT, 10) : 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    if (dev) server.use(morgan('dev'));
    server.use(helmet());
    server.use(compression());
    server.use('/', express.static(path.join(__dirname, 'public')));

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`Now serving on http://localhost:${port}`);
    });
});
