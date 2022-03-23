const should = require('chai').should()
const expect = require('chai').expect
const {promisify} = require('util')
const {Builder, By, Key} = require("selenium-webdriver")
const sleep= promisify(setTimeout)

//command running the test case: npx mocha 'menu.test.js'

describe('Header&FooterTesting', function () {
    this.timeout(300000)
    let driver
    let vars
    beforeEach(async function() {
        driver = await new Builder().forBrowser('chrome').build()
        vars = {}
        await driver.get("http://localhost:3000/")
        await driver.manage().window().setRect(839, 864)
    })
    afterEach(async function() {
        await driver.quit();
    })
    it('HeaderLogoTesting', async function() {
        // Test name: Header&FooterTesting
        // Step # | name | target | value
        // 1 | click | id=Layer_1 |
        await driver.findElement(By.xpath("/html/body/header/div/a/img")).click()
        await sleep(500)
    })
    it('HeaderDropDownMissionsTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.text-block |
        await driver.findElement(By.css(".text-block")).click()
        // 4 | click | linkText=Projects |
        await driver.findElement(By.linkText("Missions")).click()
        await sleep(500)
    })
    it('HeaderDropDownEventsTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.text-block |
        await driver.findElement(By.css(".text-block")).click()
        // 4 | click | linkText=Projects |
        await driver.findElement(By.linkText("Events")).click()
        await sleep(3000)
    })
    it('HeaderDropDownProjectTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.text-block |
        await driver.findElement(By.css(".text-block")).click()
        // 4 | click | linkText=Projects |
        await sleep(500)
        await driver.findElement(By.linkText("Projects")).click()
        await sleep(500)
    })
    it('HeaderContactTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.nav-link aka Contact |
        await driver.findElement(By.css(".nav-link")).click()
        await sleep(500)
    })
    it('FooterPSUTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.nav-link aka Contact |
        await driver.findElement(By.linkText("Penn State Behrend")).click()
        await sleep(500)
    })
    it('FooterASUTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.nav-link aka Contact |
        await driver.findElement(By.linkText("Arizona State University")).click()
        await sleep(500)
    })
    it('FooterNASATesting', async function() {
        // Unable to access NASA Page due to InsecureCertificateError
        // Step # | name | target | value
        // 3 | click | css=.nav-link aka Contact |
        await driver.findElement(By.linkText("NASA")).click()
        await sleep(500)
    })
});