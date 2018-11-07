const express = require("express");
const router = express.Router();
const ParsedPages = require('../../models/ParsedPages');
const url = require("url");

router.get('/', (req, res) => {
    let args = url.parse(req.url,true).query;
    if(!args && !args.method && !args.id){
        throw new Error("No such args");
    }

    switch(args.method){
        case "delete": {
            if(args.id === "*"){
                ParsedPages.deleteMany(()=>{
                    res.redirect("table");
                });
            }
            break;
        }
        default:{
        }
    }
});

module.exports = router;