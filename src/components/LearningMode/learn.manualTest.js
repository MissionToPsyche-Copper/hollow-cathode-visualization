const should = require('chai').should()
const {promisify} = require('util')
const {Builder, By, Key} = require("selenium-webdriver")
const { Eyes, VisualGridRunner, Target, RectangleSize, Configuration, BatchInfo, BrowserType, DeviceName, ScreenOrientation} = require('@applitools/eyes-selenium');
const sleep= promisify(setTimeout)
//const {config} = require("chai");

describe('LearningModeTesting', function () {
    this.timeout("1 day")
    let driver
    let eyes, runner
    beforeEach(async function () {
        driver = await new Builder().forBrowser('firefox').build()
        runner = new VisualGridRunner(1)
        eyes = new Eyes(runner)
        let config = new Configuration()
        config.setBatch(new BatchInfo("Hollow Cathode Learning Batch"))
        //To get API key, the tester needs Applitools account.
        //Once having Applitools account, the tester clicks user icon then clicks "My API key" to get API key
        const apiKey= "Iw47PcNCpPdr7ONwHMndMuyrF9vu3NlJBXvWNFjORYA110"
        config.setApiKey(apiKey)
        eyes.setConfiguration(config)
        await driver.get("https://jxs5476.github.io/hollow-cathode-visualization/")
    })
    afterEach(async function () {
        await driver.quit()
        await eyes.abortAsync()
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
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'BaseDrawing demo');
        await eyes.check("Landing Page", Target.window().fully());
        await driver.findElement(By.id('canvasHolder')).click();
        await eyes.check("Hollow & Hall Off Intro", Target.window().fully());
        driver.findElement(By.id('HallThrusterToggle')).click();
        await sleep(1500)
        await eyes.check("Hollow & Hall On Intro", Target.window().fully());
        driver.findElement(By.id('HallThrusterNext_Accessible')).click();
        await sleep(1500)
        await eyes.check("Hollow Intro", Target.window().fully());
        await driver.findElement(By.id('HallThrusterNext_Accessible')).click();
        await sleep(500);
        await eyes.close()
    })

    it('HeatInsertTesting', async function(){
        await sleep(1000)
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'HeatInsert demo');
        await toBaseDrawing()
        // activate heat insert scene
        await driver.findElement(By.id("HeatInsertToggle")).click();
        await sleep(500)
        await eyes.check("Heat Insert Window", Target.window().fully());
        // deactivate heat insert scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        await sleep(500)
        await eyes.close()
    })

    it('GasFeedTesting', async function(){
        await sleep(1000)
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'GasFeed demo');
        await toBaseDrawing()
        // activate gas feed scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await sleep(500)
        await eyes.check("Heat Insert Window", Target.window().fully());
        // deactivate gas feed scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await sleep(2000)
        await eyes.close()
    })

    it('InternalPlasmaTesting1', async function(){
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'InternalPlasma1 demo');
        await driver.manage().window().setRect(839, 864)
        await sleep(1000)
        await toBaseDrawing()
        // activate heat insert scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        // activate gas feed scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await driver.findElement(By.id('nextButton')).click()
        await sleep(500)
        await eyes.check("Internal Plasma Window 1", Target.window().fully());
        // deactivate gas feed scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await eyes.close()
    })

    it('InternalPlasmaTesting2', async function(){
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'InternalPlasma2 demo');
        await toBaseDrawing()
        // activate heat insert scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        // activate gas feed scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await driver.findElement(By.id('nextButton')).click()
        await sleep(500)
        await eyes.check("Heat Insert Window 2", Target.window().fully());
        //deactivate heat insert scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        await eyes.close()
    })

    it('ElectrodeKeeperTesting', async function(){
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'ElectrodeKeeper demo');
        await sleep(600)
        await toBaseDrawing()
        // activate keeper electrode scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        await sleep(500)
        await eyes.check("ElectrodeKeeper Window", Target.window().fully());
        // deactivate keeper electrode  scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        await sleep(100)
        await eyes.close()
    })

    it('Keeper&HeaterTesting1', async function(){
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'Keeper&Heater1 demo');
        await sleep(1000)
        await toBaseDrawing()
        // activate keeper electrode scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        await eyes.check("Keeper&Heater1 Keeper Window", Target.window().fully());
        // activate heat insert  scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        await eyes.check("Keeper&Heater1 Heat Window", Target.window().fully());
        await sleep(1000)
        await eyes.close()
    })

    it('Keeper&HeaterTesting2', async function(){
        await sleep(1000)
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'Keeper&Heater2 demo');
        await toBaseDrawing()
        // activate heat insert  scene
        await driver.findElement(By.id("HeatInsertToggle")).click()
        await eyes.check("Keeper&Heat2 Heat Window", Target.window().fully());
        // activate keeper electrode scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        await eyes.check("Keeper&Heater2 Window", Target.window().fully());
        await sleep(1000)
        await eyes.close()
    })

    it('Keeper&GasTesting1', async function(){
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'Keeper&Gas1 demo');
        await toBaseDrawing()
        // activate keeper electrode scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        await eyes.check("Keeper&Gas1 Keeper Window", Target.window().fully());
        // activate gas feed  scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await sleep(500)
        await eyes.check("Keeper&Gas1 Gas Window", Target.window().fully());
        await eyes.close()
    })

    it('Keeper&GasTesting2', async function(){
        await sleep(1000)
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'Keeper&Gas2 demo');
        await toBaseDrawing()
        // activate gas feed  scene
        await driver.findElement(By.id("GasFeedToggle")).click()
        await eyes.check("Keeper&Gas2 Gas Window", Target.window().fully());
        // activate keeper electrode scene
        await driver.findElement(By.id("KeeperElectrodeToggle")).click()
        await eyes.check("Keeper&Gas2 Keeper Window", Target.window().fully());
        await sleep(1000)
        await eyes.close()
    })

    it('ExternalPlasmaPathTesting', async function(){
        let idList = ["HeatInsertToggle", "GasFeedToggle", "KeeperElectrodeToggle"]
        await eyes.open(driver, 'Hollow Cathode Visualization App', 'IntegrateTesting demo');
        await toBaseDrawing()
        await sleep(500)
        await permute(idList, 0, idList.length-1, 0)
        await sleep(1000)
    })

    async function toBaseDrawing(){
        await sleep(3000)
        await driver.findElement(By.id('canvasHolder')).click()
        await sleep(1000)
        await driver.findElement(By.id('HallThrusterNext_Accessible')).click()
        await sleep(3000)
        await driver.findElement(By.id('HallThrusterNext_Accessible')).click()
        await sleep(3000)
    }

    async function permute(list, l, r, times){
        let traceTable = [];
        if(l==r){
            console.log(list+"\n")
            let i=0
            while(i<3){
                traceTable[i]=list[i];
                await sleep(1000)
                await eyes.check(list[i], Target.window().fully())
                await driver.findElement(By.id(list[i++])).click()
                // if((traceTable.includes("HeatInsertToggle") && traceTable.includes("GasFeedToggle")) || traceTable.length===3){
                    if( (traceTable[0]==="HeatInsertToggle" && traceTable[1]==="KeeperElectrodeToggle") || (traceTable[0]==="GasFeedToggle" && traceTable[1]==="KeeperElectrodeToggle")){
                        eyes.check("Error Scenario", Target.window().fully);
                        console.log('To end point... break\n')
                        break;
                    }
                    else{
                        await sleep(500)
                        await eyes.check('nextButton', Target.window().fully());
                        let el = driver.findElement(By.id('nextButton'));
                        if(el !== null)
                            el.click();
                    }
                // }
            }
            await reset(++times)
        }else {
            for (let i = l; i <= r; i++) {
                swap(list, l, i)
                await permute(list, l + 1, r)
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
        await driver.get("https://jxs5476.github.io/hollow-cathode-visualization/")
        await sleep(1000)
        await driver.findElement(By.id('canvasHolder')).click()
        await sleep(500)
        await driver.findElement(By.id('HallThrusterNext_Accessible')).click()
        await sleep(500)
        await driver.findElement(By.id('HallThrusterNext_Accessible')).click()
        await sleep(500)
        // await eyes.check("Reset Window" + times, Target.window().fully())
    }
});