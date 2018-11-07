const mainComponent = require('./main/main');
const tableComponent = require('./table/table');
const crawlComponent = require('./crawler/crawler');
const pagesComponent = require('./page/page');


module.exports = (app) => {
    app.use('/', mainComponent);
    app.use('/table', tableComponent);
    app.use('/crawl', crawlComponent);
    app.use('/pages', pagesComponent);
};