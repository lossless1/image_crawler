const args = require('optimist').argv;
const logger = require('../libs/utils/logger');
const CrawlerDalCli = require('../components/crawler/CrawlerDalCli');
const program = require('commander');

program
    .version('0.0.1').parse(process.argv);

program.command('scan <domain>')
    .alias('sc')
    .description('execute the scan')
    .option('--domain', 'name of domain', args.domain)
    .option('--isDeep <boolean type>', 'number of threads when search', true)
    .option('--maxPages <int>', 'max scan pages', 5)
    .option('--threads <int>', 'max scan pages', 10)
    .action(async (err, options) => {
        let obj = {
            name: options.domain,
            threads: options.threads,
            isDeep: options.isDeep,
            maxPages: options.maxPages,
        };
        logger.info("Start crawling...");
        logger.info("Address: " + options.domain);
        let crawler = new CrawlerDalCli(obj);
        await crawler.crawlPage();
        logger.info("Crawled.");
        await crawler.saveCrawledPage();
        logger.info("Saved.");
        process.exit(1);

    }).on('--help', function () {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ deploy exec sequential');
    console.log('  $ deploy exec async');
});

program.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program.parse(process.argv);
