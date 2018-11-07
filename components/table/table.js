const express = require("express");
const router = express.Router();
const ParsedPages = require('../../models/ParsedPages');
const moment = require('moment');

router.use((req, res, next) => {
    console.log("Time: ", moment().format());
    next();
});

function renderTableWithParams(res, error) {
    ParsedPages.find({}, (err, data) => {
        if (err) throw err;
        let sortData = data.sort((a, b) => b.numberTags - a.numberTags);
        if (error !== undefined) {
            res.render('table', {...error, pages: sortData});
        } else {
            res.render('table', {pages: sortData});
        }
    })
}

router.get('/', async (req, res, next) => {
    renderTableWithParams(res)
});

router.get('/:id', (req, res, next) => {
    const id = {_id: req.url.substr(1)};
    ParsedPages.findOne(id, (err, data) => {
        if (err) throw err;
        res.render("currentPage", {page: data});
    });
});

module.exports = router;
module.exports.renderTableWithError = renderTableWithParams;