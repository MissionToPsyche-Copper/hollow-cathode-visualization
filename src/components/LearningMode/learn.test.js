const should = require('chai').should()
const {promisify} = require('util')
const {Builder, By, Key} = require("selenium-webdriver")
const { Eyes, VisualGridRunner, Target, RectangleSize, Configuration, BatchInfo, BrowserType, DeviceName, ScreenOrientation} = require('@applitools/eyes-selenium');
const sleep= promisify(setTimeout)
//const {config} = require("chai");

describe('LearningModeTesting', function () {
    this.timeout(300000)
    let driver
    let eyes, runner
    beforeEach(async function () {
        driver = await new Builder().forBrowser('firefox').build()
        runner = new VisualGridRunner(1)
        eyes = new Eyes(runner)
        let config = new Configuration()
        config.setBatch(new BatchInfo("Hollow Cathode Learning Batch"))
        config.addBrowser(839, 864, BrowserType.CHROME);
        config.setApiKey("LyBNg7PUAI2LrhPJLJBt3P0jNjupYxn0CXaZzfpIJhc110")
        eyes.setConfiguration(config)
        await driver.get("http://localhost:3000/")
    })
    afterEach(async function () {
        await driver.quit();
        await eyes.abortAsync();
        const allTestResults= await runner.getAllTestResults()
        console.log(allTestResults)
    })
    /*
    * Logic Table:
    * ---------------------------------------------------------
    * | Electrode Keeper | Gas Feed  | Heat Insert | Result   |
    * ---------------------------------------------------------
    * |     0            |      0    |   0         | base     | done
    * |     0            |      0    |   1         | heat     | done
    * |     0            |      1    |   0         | gas      | done
    * |     0            |      1    |   1         | internal | done
    * |     1            |      0    |   0         | keeper   | done
    * |     1            |      0    |   1         | k+h      | done
    * |     1            |      1    |   0         | k+g      | done
    * |     1            |      1    |   1         | external | done
    * */
    it('BaseDrawingTesting', async function(){
        await sleep(1000)
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'BaseDrawing demo', new RectangleSize(839, 864));
        await eyes.check("BasDrawing Window", Target.window().fully());
        await driver.findElement(By.id("canvasHolder")).click()
        await sleep(2000)
        await eyes.close()
    })

    it('HeatInsertTesting', async function(){
        await sleep(1000)
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'HeatInsert demo', new RectangleSize(839, 864));
        await driver.findElement(By.id("canvasHolder")).click();
        // activate heat insert scene
        await driver.findElement(By.id("HeatInsertToggle")).click();
        await eyes.check("Heat Insert Window", Target.window().fully());
        // deactivate heat insert scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        await sleep(2000)
        await eyes.close()
    })

    it('GasFeedTesting', async function(){
        await sleep(1000)
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'GasFeed demo', new RectangleSize(839, 864));
        await driver.findElement(By.id("canvasHolder")).click()
        // activate gas feed scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await eyes.check("Heat Insert Window", Target.window().fully());
        // deactivate gas feed scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await sleep(2000)
        await eyes.close()
    })

    it('InternalPlasmaTesting1', async function(){
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'InternalPlasma1 demo', new RectangleSize(839, 864));
        await driver.manage().window().setRect(839, 864)
        await sleep(1000)
        await driver.findElement(By.id("canvasHolder")).click()
        // activate heat insert scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        // activate gas feed scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await driver.findElement(By.id('nextButton')).click()
        await eyes.check("Internal Plasma Window 1", Target.window().fully());
        await sleep(2000)
        // deactivate gas feed scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await eyes.close()
    })

    it('InternalPlasmaTesting2', async function(){
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'InternalPlasma2 demo', new RectangleSize(839, 864));
        await driver.findElement(By.id("canvasHolder")).click()
        // activate heat insert scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        // activate gas feed scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await driver.findElement(By.id('nextButton')).click()
        await sleep(1000)
        await eyes.check("Heat Insert Window 2", Target.window().fully());
        //deactivate heat insert scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        await eyes.close()
    })

    it('ElectrodeKeeperTesting', async function(){
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'ElectrodeKeeper demo', new RectangleSize(839, 864));
        await sleep(1000)
        await driver.findElement(By.id("canvasHolder")).click()
        // activate keeper electrode scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        await eyes.check("ElectrodeKeeper Window", Target.window().fully());
        // deactivate keeper electrode  scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        await sleep(1000)
        await eyes.close()
    })

    it('Keeper&HeaterTesting1', async function(){
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'Keeper&Heater1 demo', new RectangleSize(839, 864));
        await sleep(1000)
        await driver.findElement(By.id("canvasHolder")).click()
        // activate keeper electrode scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        // activate heat insert  scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        await eyes.check("Keeper&Heater1 Window", Target.window().fully());
        await sleep(1000)
        await eyes.close()
    })

    it('Keeper&HeaterTesting2', async function(){
        await sleep(1000)
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'Keeper&Heater2 demo', new RectangleSize(839, 864));
        await driver.findElement(By.id("canvasHolder")).click()
        // activate heat insert  scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        // activate keeper electrode scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        await eyes.check("Keeper&Heater2 Window", Target.window().fully());
        await sleep(1000)
        await eyes.close()
    })

    it('Keeper&GasTesting1', async function(){
        await sleep(1000)
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'Keeper&Gas1 demo', new RectangleSize(839, 864));
        await driver.findElement(By.id("canvasHolder")).click()
        // activate keeper electrode scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        // activate gas feed  scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await eyes.check("Keeper&Gas1 Window", Target.window().fully());
        await sleep(1000)
        await eyes.close()
    })

    it('Keeper&GasTesting2', async function(){
        await sleep(1000)
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'Keeper&Gas2 demo', new RectangleSize(839, 864));
        await driver.findElement(By.id("canvasHolder")).click()
        // activate gas feed  scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        // activate keeper electrode scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        await eyes.check("Keeper&Gas2 Window", Target.window().fully());
        await sleep(1000)
        await eyes.close()
    })

    it('ExternalPlasmaPathTesting', async function(){
        let idList = ["HeatInsertToggle", "GasFeedToggle", "KeeperElectrodeToggle"]
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'IntegrateTesting demo', new RectangleSize(839, 864));
        await driver.findElement(By.id("canvasHolder")).click()
        await sleep(3000)
        await permute(idList, 0, idList.length-1, 0)
        await sleep(5000)
    })

    async function permute(list, l, r, times){
        if(l==r){
            console.log(list+"\n"+times)
            let i=0
            let elements
            while(i<3){
                await eyes.check(list[i], Target.window().fully());
                await driver.findElement(By.id(list[i++])).click()
                elements= await driver.findElements(By.id('nextButton'))
                if(elements.length!=0){
                    await eyes.check('nextButton', Target.window().fully());
                    await driver.findElement(By.id('nextButton')).click()
                }
                await sleep(500)
            }
            await reset(times)
        }else {
            for (let i = l; i <= r; i++) {
                swap(list, l, i)
                await permute(list, l + 1, r, ++times)
                swap(list, l, i)
            }
        }
    }
    function swap(list, l, r){
        let tmp= list[l]
        list[l]= list[r];
        list[r]= tmp;
    }
    async function reset(times){
        await driver.findElement(By.id('backButton')).click()
        await driver.findElement(By.id("canvasHolder")).click()
        await eyes.check("Reset Window "+times, Target.window().fully());
    }
});