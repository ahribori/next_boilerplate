const routes = module.exports = require('next-routes')();

routes
    .add({ name: 'page', pattern: '/page/:id', page: 'page' });