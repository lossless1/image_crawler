const needle = require('needle');
const cheerio = require('cheerio');
const {validateUrlByRegExp} = require('../../libs/utils/validate');
const ParsedPages = require('../../models/ParsedPages');
const CrawlerBase = require('./CrawlerBase');
const tress = require('tress');
const moment = require('moment');
const logger = require('../../libs/utils/logger');
const URL = require('url').URL;

class CrawlerApi extends CrawlerBase {
    constructor() {
        super();
    }

    getTimeDiff(prev, after) {
        this.timeDiff = moment.utc(moment(after, "DD/MM/YYYY HH:mm:ss").diff(moment(prev, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
        logger.info("Duration: " + this.timeDiff);
        return this.timeDiff;
    }

    getHostNameOfUrl(url) {
        return new URL(url).hostname;
    }

    isOriginalSites(urlOrigin, urlCrawl) {
        return this.getHostNameOfUrl(urlOrigin) === this.getHostNameOfUrl(urlCrawl);
    }

    crawlPage() {
        return new Promise(response => {
            let counterPage = 0;
            let timerBefore;
            let countTag = 0;
            let timerAfter;
            let queuePages = [];
            timerBefore = moment().format("DD/MM/YYYY HH:mm:ss");
            let queue = tress((url, callback) => {
                needle.get(url, (err, page) => {
                    let $ = cheerio.load(page.body);
                    if (err) throw err;
                    $('img').filter((i, el) => {
                        return validateUrlByRegExp(el.attribs.src);
                    }).each((data) => {
                        countTag++;
                    });
                    this.countTag = countTag;
                    logger.info("Crawl: " + url);
                    logger.info("Adding additional " + this.maxPages + " pages...");
                    let tagsA = $('a');
                    for (let i = 0; i < tagsA.length; i++) {
                        let elHostRef = tagsA[i].attribs.href;
                        if (counterPage < this.maxPages) {
                            if (validateUrlByRegExp(elHostRef)) {
                                if (elHostRef !== url && this.isOriginalSites(elHostRef, url) && !queuePages.find(val => val === elHostRef)) {
                                    queue.push(elHostRef);
                                    queuePages.push(elHostRef);
                                    counterPage++;
                                }
                            }
                        } else {
                            break;
                        }
                    }
                    callback();
                });
            });
            queue.drain = () => {
                timerAfter = moment().format("DD/MM/YYYY HH:mm:ss");
                this.getTimeDiff(timerBefore, timerAfter);
                response(true);
            };

            queue.push(this.pageUrl);
        })
    }

    saveCrawledPage() {
        return new Promise(res => {
            const page = new ParsedPages({
                name: this.pageUrl,
                numberTags: this.countTag,
                maxPages: this.maxPages,
                isDeep: Boolean(this.isDeep),
                threads: this.threads,
                duration: this.timeDiff
            });
            page.save((err) => {
                if (err) throw err;
                res(true);
            })
        })
    }
}

module.exports = CrawlerApi;