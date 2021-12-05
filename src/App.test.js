/*import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

/*
* Todo:
*  - First, install specific browserdriver for specific browser
*    (download link: https://www.npmjs.com/package/selenium-webdriver
*    for WindowOS, place the browserdriver in system PATH
*    for MacOS, good luck =) )
*  - Second, install yarn and node
*   + For yarn, use "npm i --global yarn"
*  - Third, use yarn to install mocha and chai
*  - Fourth, use npm to install selenium-webdriver
*
* To Learn:
*  https://www.youtube.com/watch?v=zq7snpyr44w&list=PLZMWkkQEwOPl0udc9Dap2NbEAkwkdOTV3&index=1
*
* To Run:
*  - Before running test suits, make sure the you are inside the src folder. By doing so, in terminal, type: 'cd src'
*  - Traditional way, type "yarn test" or "npm test".
*  - In case got error messages like "driver.quite", "timeout()"
*  type "npx mocha '[test-file].test.js'" in your terminal or batch.
* */
const {Builder, By, Key} = require("selenium-webdriver");
const assert = require("assert")
var should = require('chai').should()
const {promisify} = require('util')
const sleep= promisify(setTimeout)

//Create Test Suite
//This PSUBehrend Test Suite is an example
describe('testPSUBehrend', function () {
    //Set up maximum timeout for each test case
    this.timeout("5mins")
    //Set up BeforeEach and AfterEach
    let driver, vars
    beforeEach(async function () {
        // Choose web browser to run test.
        driver = await new Builder().forBrowser("chrome").build();
        vars = {};
    })
    afterEach(async function () {
        // Close the driver when it's done.
        await driver.quit();
    })
    // Create test cases
    // Test case 1:
    it("Successfully run Behrend webpage", async function () {
        // Create test script
        // 1 | open | / |
        await driver.get("https://behrend.psu.edu/")
        // 2 | setWindowSize | 1549x877 |
        await driver.manage().window().setRect(1549, 877)
        // 3 | click | css=.node:nth-child(2) .video-play-icon |
        await driver.findElement(By.css(".node:nth-child(2) .video-play-icon")).click()
        // 4 | click | css=.video-embed-field-lazy-play |
        await driver.findElement(By.css(".video-embed-field-lazy-play")).click()
        // 5 | click | linkText=Home |
        await driver.findElement(By.linkText("Home")).click()
        // 6 | click | linkText=Academics |
        await driver.findElement(By.linkText("Academics")).click()
        // 7 | click | linkText=School of Engineering |
        await driver.findElement(By.linkText("School of Engineering")).click()
        // 8 | click | id=edit-keys |
        await driver.findElement(By.id("edit-keys")).click()
        // 9 | type | id=edit-keys | Software Engineering
        await driver.findElement(By.id("edit-keys")).sendKeys("Software Engineering")
        // 10 | sendKeys | id=edit-keys | ${KEY_ENTER}
        await driver.findElement(By.id("edit-keys")).sendKeys(Key.ENTER)
        // 11 | runScript | window.scrollTo(0,423.6000061035156) |
        //Allow the webpage to load content, force webdriver sleep in 5s
        await sleep(6000)
        await driver.executeScript("window.scrollTo(0,423.6000061035156)")
        // 12 | click | linkText=Software Engineering Faculty | Penn State Behrend |
        await driver.findElement(By.linkText("Software Engineering Faculty | Penn State Behrend")).click()
        await sleep(6000)
        // 13 | click | id=edit-keys |
        await driver.findElement(By.id("edit-keys")).click()
        await sleep(6000)
        // 14 | type | id=edit-keys | Computer Science
        await driver.findElement(By.id("edit-keys")).sendKeys("Computer Science")
        await sleep(6000)
        // 15 | sendKeys | id=edit-keys | ${KEY_ENTER}
        await driver.findElement(By.id("edit-keys")).sendKeys(Key.ENTER)
        // 16 | click | linkText=Computer Science | Penn State Behrend |
        //Allow the webpage to load content, force webdriver sleep in 5s
        await sleep(6000)
        await driver.findElement(By.linkText("Computer Science | Penn State Behrend")).click()
        await sleep(6000)
        // 17 | click | linkText=School of Engineering |
        await driver.findElement(By.linkText("School of Engineering")).click()
        await sleep(6000)
        // 18 | click | css=.prototype-icon-social-youtube |
        await driver.findElement(By.css(".prototype-icon-social-youtube")).click()
        await sleep(6000)
    })
})
