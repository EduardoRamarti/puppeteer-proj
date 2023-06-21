const puppeteer = require('puppeteer');

describe('Emulando Dispositivos', () => {

  let browser
  let page
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless:false,
      defaultViewport: null
    })

    page = await browser.newPage()
    await page.goto('https://platzi.com', { waitUntil:'networkidle0' })
  },35000)

  afterAll(async ()=>{
    await browser.close()
  })


  it('Emulando dispositivos de forma manual', async () => {
    await page.emulate({
      name:'iPhone XS Max',
      viewport:{
        width:414,
        height:896,
        deviceScaleFactor:2,
        isMobile:true,
        hasTouch:true,
        isLandscape:false
      },
      userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'
    })
    await new Promise(resolve => setTimeout(resolve, 5000))
  },30000);


  it('Emulando sitio de escritorio', async () => {
    await page.setViewport({
      width:1500,
      height:800
    })
    await new Promise(resolve => setTimeout(resolve, 3000))
  },30000);


  it('Emulando sitio de iPad', async () => {
    const iPad = puppeteer.devices['iPad Pro']
    await page.emulate(iPad)
    await new Promise(resolve => setTimeout(resolve, 5000))
  },30000);


  it('Emulando sitio de iPad en horizontal(landscape)', async () => {
    const iPad = puppeteer.devices['iPad landscape']
    await page.emulate(iPad)
    await new Promise(resolve => setTimeout(resolve, 5000))
  },30000);


  it('Emulando sitio en un iphone)', async () => {
    const iPhone = puppeteer.devices['iPhone 11 Pro Max']
    await page.emulate(iPhone)
    await new Promise(resolve => setTimeout(resolve, 5000))
  },30000);
});
