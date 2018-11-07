const express = require("express");
const router = express.Router();
const CrawlerDal = require('./CrawlerDalWeb');

router.get('/', async (req, res, err) => {
    const crawlerDal = new CrawlerDal(req, res);
    await crawlerDal.crawlPage();
    await crawlerDal.saveCrawledPage();
    res.redirect('table');
});


module.exports = router;