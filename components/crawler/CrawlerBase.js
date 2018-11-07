class CrawlerBase {
    constructor() {
    }

    get pageUrl() {
        return this._crawlPageName;
    }

    get timeDiff() {
        return this._timeDiff;
    }

    get countTag() {
        return this._countTag;
    }

    get maxPages() {
        return this._maxPagesToCrawl;
    }

    get threads() {
        return this._threads;
    }

    get isDeep() {
        return this._isDeep;
    }

    get tag() {
        return this._tag;
    }

    set countTag(value) {
        this._countTag = value;
    }

    set pageUrl(value) {
        this._crawlPageName = value;
    }

    set maxPages(value) {
        this._maxPagesToCrawl = value;
    }

    set threads(value) {
        this._threads = value;
    }

    set isDeep(value) {
        this._isDeep = value;
    }

    set tag(value) {
        this._tag = value;
    }

    set timeDiff(value) {
        this._timeDiff = value;
    }
}

module.exports = CrawlerBase;