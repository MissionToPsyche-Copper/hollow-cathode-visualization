var should = require('chai').should()
const {promisify} = require('util')
const {Builder, By, Key} = require("selenium-webdriver");
const sleep= promisify(setTimeout)

describe('Header&FooterTesting', function () {
    this.timeout(30000)
    let driver
    let vars
    beforeEach(async function() {
        driver = await new Builder().forBrowser('firefox').build()
        vars = {}
    })
    afterEach(async function() {
        await driver.quit();
    })
    it('HeaderLogoTesting', async function() {
        // Test name: Header&FooterTesting
        // Step # | name | target | value
        // 1 | open | / |
        await driver.get("http://localhost:3000/")
        // 2 | setWindowSize | 755x864 |
        await driver.manage().window().setRect(755, 864)
        // 3 | click | id=Layer_1 |
        await driver.findElement(By.id("Layer_1")).click()
    })
    it('HeaderDropDownMissionsTesting', async function() {
        // Step # | name | target | value
        // 1 | open | / |
        await driver.get("http://localhost:3000/")
        // 2 | setWindowSize | 839x864 |
        await driver.manage().window().setRect(839, 864)
        // 3 | click | css=.text-block |
        await driver.findElement(By.css(".text-block")).click()
        // 4 | click | linkText=Projects |
        await driver.findElement(By.linkText("Missions")).click()
        await sleep(4000)
    })
    it('HeaderDropDownEventsTesting', async function() {
        // Step # | name | target | value
        // 1 | open | / |
        await driver.get("http://localhost:3000/")
        // 2 | setWindowSize | 839x864 |
        await driver.manage().window().setRect(839, 864)
        // 3 | click | css=.text-block |
        await driver.findElement(By.css(".text-block")).click()
        // 4 | click | linkText=Projects |
        await driver.findElement(By.linkText("Events")).click()
        await sleep(3000)
    })
    it('HeaderDropDownProjectTesting', async function() {
        // Step # | name | target | value
        // 1 | open | / |
        await driver.get("http://localhost:3000/")
        // 2 | setWindowSize | 839x864 |
        await driver.manage().window().setRect(839, 864)
        // 3 | click | css=.text-block |
        await driver.findElement(By.css(".text-block")).click()
        // 4 | click | linkText=Projects |
        await sleep(2000)
        await driver.findElement(By.linkText("Projects")).click()
        await sleep(3000)
    })
    it('HeaderContactTesting', async function() {
        // Step # | name | target | value
        // 1 | open | / |
        await driver.get("http://localhost:3000/")
        // 2 | setWindowSize | 839x864 |
        await driver.manage().window().setRect(839, 864)
        // 3 | click | css=.nav-link aka Contact |
        await driver.findElement(By.css(".nav-link")).click()
        await sleep(3000)
    })
    it('FooterPSUTesting', async function() {
        // Step # | name | target | value
        // 1 | open | / |
        await driver.get("http://localhost:3000/")
        // 2 | setWindowSize | 839x864 |
        await driver.manage().window().setRect(839, 864)
        // 3 | click | css=.nav-link aka Contact |
        await driver.findElement(By.linkText("Penn State Behrend")).click()
        await sleep(3000)
    })
    it('FooterASUTesting', async function() {
        // Step # | name | target | value
        // 1 | open | / |
        await driver.get("http://localhost:3000/")
        // 2 | setWindowSize | 839x864 |
        await driver.manage().window().setRect(839, 864)
        // 3 | click | css=.nav-link aka Contact |
        await driver.findElement(By.linkText("Arizona State University")).click()
        await sleep(3000)
    })
    it('FooterNASATesting', async function() {
        //Unable to access NASA Page due to InsecureCertificateError
        // Step # | name | target | value
        // 1 | open | / |
        await driver.get("http://localhost:3000/")
        // 2 | setWindowSize | 839x864 |
        await driver.manage().window().setRect(839, 864)
        // 3 | click | css=.nav-link aka Contact |
        await sleep(3000)
        await driver.findElement(By.linkText("NASA")).click()
        await sleep(3000)
    })
});