const next = require('next');
const express = require('express');
const { parse } = require('url');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const expressApp = express();
const requestHandler = routes.getRequestHandler(nextApp);

nextApp.prepare().then(() => {
    expressApp.use(bodyParser.urlencoded({ extended: false }));
    expressApp.use(bodyParser.json());

    if (process.env.NODE_ENV === 'production') {
        expressApp.use(compression());
        // only in development environment
    } else {
        // only in production environment
        expressApp.use(morgan('dev'));
    }

    expressApp.use(requestHandler);

    expressApp.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
