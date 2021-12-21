const {promisify} = require('util')
const {Builder, By, Key} = require("selenium-webdriver")
const sleep = promisify(setTimeout)

//command running the test case: npx mocha 'menu.test.js'

describe('Header&FooterTesting', function () {
    this.timeout(300000)
    let driver
    let assert
    beforeEach(async function() {
        driver = await new Builder().forBrowser('chrome').build()
        assert= require('chai').assert
        await driver.get("http://localhost:3000/")
        await driver.manage().window().setRect(839, 864)
    })
    afterEach(async function() {
        await sleep(1000)
        await driver.quit();
    })
    it('HeaderLogoTesting', async function() {
        // Test name: Header&FooterTesting
        // Step # | name | target | value
        // 1 | click | id=Layer_1 |
        await driver.findElement(By.css(".brand > img:nth-child(1)")).click()
        let currentURL = await driver.getCurrentUrl()
        await assert(currentURL === "https://psyche.asu.edu/", "Not PSYCHE Page!!!")
    })
    it('HeaderDropDownMissionsTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.text-block |
        await sleep(1000)
        await driver.findElement(By.css(".text-block")).click()
        // 4 | click | linkText=Projects |
        await driver.findElement(By.linkText("Missions")).click()
        await assert(await driver.getCurrentUrl() === "https://psyche.asu.edu/mission/", "Not MISSION Page!!!")
    })
    it('HeaderDropDownEventsTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.text-block |
        await driver.findElement(By.css(".text-block")).click()
        // 4 | click | linkText=Projects |
        await driver.findElement(By.linkText("Events")).click()
        await assert(await driver.getCurrentUrl() === "https://psyche.asu.edu/events/", "Not EVENTS Page!!!")
    })
    it('HeaderDropDownProjectTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.text-block |
        await driver.findElement(By.css(".text-block")).click()
        // 4 | click | linkText=Projects |
        await sleep(2000)
        await driver.findElement(By.linkText("Projects")).click()
        const expected ="https://psyche.asu.edu/get-involved/capstone-projects/capstone-projects-copper-class/hollow-cathode-visualization-penn-state-behrend/"
        await assert(await driver.getCurrentUrl() === expected, "Not EVENTS Page!!!")
    })
    it('HeaderContactTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.nav-link aka Contact |
        await driver.findElement(By.css(".nav-link")).click()
        await assert(await driver.getCurrentUrl() === "https://psyche.asu.edu/contact/", "Not CONTACT Page!!!")
    })
    it('FooterPSUTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.nav-link aka Contact |
        await driver.findElement(By.linkText("Penn State Behrend")).click()
        await assert(await driver.getCurrentUrl() === "https://behrend.psu.edu/", "Not PSBehrend Page!!!")
    })
    it('FooterASUTesting', async function() {
        // Step # | name | target | value
        // 3 | click | css=.nav-link aka Contact |
        await driver.findElement(By.linkText("Arizona State University")).click()
        await assert(await driver.getCurrentUrl() === "https://www.asu.edu/", "Not ASU Page!!!")
    })
    it('FooterNASATesting', async function() {
        // Unable to access NASA Page due to InsecureCertificateError
        // Step # | name | target | value
        // 3 | click | css=.nav-link aka Contact |
        await sleep(2000)
        await driver.findElement(By.linkText("NASA")).click()
        await assert(await driver.getCurrentUrl() === "https://www.nasa.gov/", "Not NASA Page!!!")
    })
});