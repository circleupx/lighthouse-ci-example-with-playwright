import { Browser, chromium, Page } from 'playwright';
import lh = require('lighthouse');

let browser: Browser;
beforeAll(async () => {
    browser = await chromium.launch({ headless: false, args: [`--remote-debugging-port=8041`] });
});

afterAll(async () => {
    await browser.close();
});

let page: Page;
beforeEach(async () => {
    page = await browser.newPage();
});

afterEach(async () => {
    await page.close();
});

describe('Load shop.polymer-project.org home page', function () {
    it('should have a page performance greater than or equal to 80', async () => {
        const options = { logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: 8041 };
        const runnerResult = await lh('https://shop.polymer-project.org/', options);
        console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

        expect(runnerResult.lhr.categories.performance.score * 100).toBeGreaterThanOrEqual(80);
    });
});