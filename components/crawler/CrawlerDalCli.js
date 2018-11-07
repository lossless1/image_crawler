const {validateUrlByRegExp} = require('../../libs/utils/validate');
const CrawlerApi = require('./CrawlerApi');
const logger = require('../../libs/utils/logger');

class CrawlerDalCli extends CrawlerApi {
    constructor(data) {
        super();
        CrawlerDalCli.validateUrl(data.name);
        this.pageUrl = data.name;
        this.maxPages = data.count || 5;
        this.threads = data.threads || 1;
        this.isDeep = data.isDeep || true;
        this.tag = data.tag || 'img';
        this.countTag = 0;
        this.timeDiff = "";
    }

    static validateUrl(name){
        if(!validateUrlByRegExp(name)){
            logger.error("Url is invalid!");
            process.exit()
        }
    }
}

module.exports = CrawlerDalCli;