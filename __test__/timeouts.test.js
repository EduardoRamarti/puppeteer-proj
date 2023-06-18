const puppeteer = require('puppeteer');

describe('Mi primer test en puppeteer', () => {

    jest.setTimeout(30000)

    it('Mostrar todos los diferentes tipos de espera', async () => {
    const browser = await puppeteer.launch({
        headless:false
    })

    const page = await browser.newPage()
    page.setDefaultTimeout(10000)
    page.setDefaultNavigationTimeout(10000)
    await page.goto('https://platzi.com',{waitUntil:'networkidle0'})

    //Espera explicita (no recomendada)
    await new Promise(resolve => setTimeout(resolve, 1000))
    await page.waitForSelector('img')
    await page.waitForXPath('//*[@id="Header-v2"]/nav[1]/div[1]/div/a/div/figure/img')
    await page.goto('https://demoqa.com/modal-dialogs',{waitUntil:'networkidle2'})
    const button = await page.waitForSelector('#showSmallModal',{ visible: true})
    await button.click()


    //Espera por funcion 
    await page.waitForFunction(()=> document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')
    await page.click('#closeSmallModal')
    await page.waitForFunction(()=> !document.querySelector('#example-modal-sizes-title-sm'),{
        timeout:15000
    })
    

    await browser.close()
});
});
