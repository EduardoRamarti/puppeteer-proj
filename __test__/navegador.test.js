const puppeteer = require('puppeteer');

describe('Mi primer test en puppeteer', () => {

  it('Debe abrir y cerrar el navegador', async () => {
    const browser = await puppeteer.launch({
      //Con executablePath se puede indicar que navegador utilizar para realizar el ejercicio
      //executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',

      // headless: true hace que no se abra el navegador y que las pruebas sean más rápidas, el headless: false siempre nos abre el navegador
      headless: true
/*
      // slowMo nos indica en cámara lenta, el cual retarda el tiempo de ejecucion del test
      slowMo: 0,

      // devtools por defecto es false, si es true nos abre el devtools en el navegador
      devtools: false,

      // defaultViewport es un objeto con las dimensiones del viewport (nosotros las establecemos)
      defaultViewport: {
        width: 2100,
        height: 1080,
      },

      // argumentos en forma de array de la prueba setea el tamaño de la ventana
      args: [
        // '--window-size=1920,1080', // tamaño de la ventana
      ],

      //setea la pagina del tamaño de la browser (ventana normal de browser)
      defaultViewport: null
*/
    });

    const page = await browser.newPage();
    await page.goto('https://www.yahoo.com');
    await new Promise(resolve => setTimeout(resolve, 1000))
    await page.waitForSelector('img')

    //Recargar una pagina
    await page.reload()
    await new Promise(resolve => setTimeout(resolve, 1000))

    //navegar hacia otro sitio
    await page.goto('https://platzi.com')
    await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img')

    //Navegar hacia atras
    await page.goBack()
    //Navegar hacia delante 
    await page.goForward()

    //abrir otra pagina
    const page2 = await browser.newPage()
    await page2.goto("https://github.com")


    await browser.close();

  }, 35000);
});
