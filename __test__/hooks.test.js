const puppeteer = require('puppeteer');

describe('Extrayendo informacion', () => {

  /**
   * ¿Que son los hooks?
   * son técnicas o métodos utilizados para interactuar con eventos o acciones específicas durante la automatización con Puppeteer. 
   * Estos hooks pueden variar dependiendo de los casos de uso y las necesidades de automatización.
   * 
   * "Before" y "after" hooks: Estos hooks se utilizan para ejecutar cierto código antes y después de realizar una acción específica. Por ejemplo, podrías utilizar un "before" hook para iniciar el navegador de Puppeteer antes de iniciar una prueba y un "after" hook para cerrar el navegador después de que se haya completado la prueba.
   *
   * "Page" hooks: Estos hooks están relacionados con los eventos y acciones en una página web específica. Por ejemplo, puedes utilizar un "page" hook para esperar a que un elemento aparezca en la página antes de realizar una acción sobre él.
   * 
   * "Request" y "response" hooks: Estos hooks se utilizan para interceptar y manipular solicitudes y respuestas de red durante la automatización con Puppeteer. Puedes utilizarlos para realizar acciones como bloquear o modificar solicitudes, o para extraer información de las respuestas recibidas.
   */

  let browser
  let page
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless:false,
      defaultViewport: null
    })

    page = await browser.newPage()
  },35000)

  afterAll(async ()=>{
    await browser.close()
  })

  it('Extraer el titulo de la pagina', async () => {
    await page.goto('https://platzi.com',{ waitUntil: 'networkidle0'})

    await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-desktopCtas > div.Menu > div > div > ul > li:nth-child(8) > a')
    const nombreBoton = await page.$eval('#Header-v2 > nav.Nav-header.Nav-header-desktopCtas > div.Menu > div > div > ul > li:nth-child(8) > a', (button)=>button.textContent)
    console.log('nombre del boton', nombreBoton)

});


  it('Extraer el titulo de la pagina', async () => {
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
});


  it('Extraer el titulo de la pagina', async () => {
  await page.goto('https://platzi.com',{ waitUntil: 'networkidle0'})

  const images = await page.$$eval('img', (imagenes)=>imagenes.lenght )
  console.log('images', images)

});
});
