const puppeteer = require('puppeteer');

describe('Mi primer test en puppeteer', () => {

  it('Debe abrir y cerrar el navegador', async () => {
    
    const browser = await puppeteer.launch({
      headless:false,
      defaultViewport:null,
      slowMo:5
    })

    const page = await browser.newPage()
    await page.goto('https://demo.guru99.com/test/simple_context_menu.html')

    //Añadiendo un event listener que nos ayudara a cerrar los alerts (dialogs) que aparezcan 
    page.on('dialog',async(dialog)=>{
      await new Promise(resolve => setTimeout(resolve, 1500))
      await dialog.accept()
    })
/*
    //Click derecho 
    await page.click('#authentication > span', {button:'right', delay:500})
    await new Promise(resolve => setTimeout(resolve, 3000))
*/
    //Doble click
    await page.click('#authentication > button',{clickCount:2, delay:500})
    await new Promise(resolve => setTimeout(resolve, 1000))


    //Navegando en formulario 
    await page.goto('https://devexpress.github.io/testcafe/example/')
    await page.type('#developer-name', 'Prueba', {delay: 100})
    // await new Promise(resolve => setTimeout(resolve, 1000))
    
    await page.click('#remote-testing')
    await page.click('#macos')
    await page.select('#preferred-interface','JavaScript API')
    await page.click('#tried-test-cafe')
    await new Promise(resolve => setTimeout(resolve, 1000))
    await page.type('#comments','Esto es un comentario')
    await page.click('#submit-button')

    await new Promise(resolve => setTimeout(resolve, 1000))
    await browser.close()

}, 35000);
});
