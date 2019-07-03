const express = require('express');
const next = require('next');
const path = require('path');
const morgan = require('morgan');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // server.use(morgan('dev'));
    server.use('/', express.static(path.join(__dirname, 'public')));

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    const port = prod ? process.env.PORT : 3000;

    server.listen(port, err => {
        if (err) throw err;
        console.log(`Now serving on http://localhost:${port}`);
    });
});
