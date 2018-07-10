const next = require('next');
const express = require('express');
const { parse } = require('url');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const LRUCache = require('lru-cache');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const expressApp = express();
const requestHandler = routes.getRequestHandler(nextApp);

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 5, // 5 minutes
});

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

    expressApp.use('*', (req, res, _next) => {
        _next();
    });

    // expressApp.get('/', (req, res) => {
    //     return renderAndCache(req, res, '/');
    // });
    //
    // expressApp.get('/page/:id', (req, res) => {
    //     const queryParams = { id: req.params.id };
    //     return renderAndCache(req, res, '/page', queryParams);
    // });

    expressApp.use(requestHandler);

    expressApp.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
    return `${req.url}`;
}

async function renderAndCache(req, res, pagePath, queryParams) {
    const key = getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
        res.setHeader('X-Cache', 'HIT');
        res.send(ssrCache.get(key));
        return;
    }

    try {
        // If not let's render the page into HTML
        const html = await nextApp.renderToHTML(req, res, pagePath, queryParams);

        // Something is wrong with the request, let's skip the cache
        if (res.statusCode !== 200) {
            res.send(html);
            return;
        }

        // Let's cache this page
        ssrCache.set(key, html);

        res.setHeader('X-Cache', 'MISS');
        res.send(html);
    } catch (err) {
        nextApp.renderError(err, req, res, pagePath, queryParams);
    }
}