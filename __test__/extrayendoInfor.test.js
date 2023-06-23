const puppeteer = require('puppeteer');
const { getText, getCount } = require('../lib/helpers');

describe('Extrayendo informacion', () => {

  it('Extraer el titulo de la pagina', async () => {
    
    const browser = await puppeteer.launch({
      headless:false,
      defaultViewport: null
    })

    const page = await browser.newPage()
    await page.goto('https://platzi.com',{ waitUntil: 'networkidle0'})

    await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-desktopCtas > div.Menu > div > div > ul > li:nth-child(8) > a')
    const nombreBoton = await getText(page, '#Header-v2 > nav.Nav-header.Nav-header-desktopCtas > div.Menu > div > div > ul > li:nth-child(8) > a')
    console.log('nombreBoton', nombreBoton)

    await browser.close()
}, 35000);


  it('Extraer el titulo de la pagina', async () => {
    
  const browser = await puppeteer.launch({
    headless:false,
    defaultViewport: null
  })
  const page = await browser.newPage()
  await page.goto('https://platzi.com',{ waitUntil: 'networkidle0'})
  
  const [button] = await page.$x('//*[@id="Header-v2"]/nav[2]/div[3]/div/div/ul/li[8]/a')

  const propiedad = await button.getProperty('textContent')
  const texto = await propiedad.jsonValue()

  console.log('texto', texto)

  //Segunda forma 
  const texto2 = await page.evaluate((name)=> name.textContent, button)
  console.log('texto2', texto2)
  const button3 = await page.waitForXPath('//*[@id="Header-v2"]/nav[2]/div[3]/div/div/ul/li[8]/a')
  const texto3 = await page.evaluate((name)=> name.textContent, button3)
  await browser.close()
}, 35000);


  it('Extraer el titulo de la pagina', async () => {
    
  const browser = await puppeteer.launch({
    headless:false,
    defaultViewport: null
  })

  const page = await browser.newPage()
  await page.goto('https://platzi.com',{ waitUntil: 'networkidle0'})


  const images = await getCount(page,'img')
  console.log('images', images)


  await browser.close()
}, 35000);
});
