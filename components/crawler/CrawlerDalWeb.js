const {validateUrlByRegExp} = require('../../libs/utils/validate');
const renderTableWithError = require("../table/table").renderTableWithError;
const url = require('url');
const CrawlerApi = require('./CrawlerApi');

class CrawlerDalWeb extends CrawlerApi {
    constructor(req, res) {
        super();
        const query = url.parse(req.url, true).query;
        if (!query.name) {
            renderTableWithError(res, {error: {type: "inputCrawler", message: 'Enter please name'}});
        } else if (!validateUrlByRegExp(query.name)) {
            renderTableWithError(res, {error: {type: "inputCrawler", message: 'Invalid url!'}});
        } else {
            this.pageUrl = query.name;
            this.maxPages = query.count || 5;
            this.threads = query.threads || 1;
            this.isDeep = query.isDeep || true;
            this.tag = query.tag || 'img';
            this.countTag = 0;
            this.timeDiff = "";
        }
    }


}

module.exports = CrawlerDalWeb;