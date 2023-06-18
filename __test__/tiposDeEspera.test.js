const puppeteer = require('puppeteer');

describe('Mi primer test en puppeteer', () => {

  it('Mostrar todos los diferentes tipos de espera', async () => {
    
    const browser = await puppeteer.launch({
      headless:false,
      // defaultViewport:null,
      // slowMo:5
    })

    const page = await browser.newPage()

    //Espera para la navegacions
    //Opciones dentro waitUntil:
    /*
    'load': Espera a que se haya cargado la página por completo (incluidos los recursos en segundo plano y las imágenes).
    
    'domcontentloaded': Espera a que se haya cargado el contenido principal del DOM de la página. 
    Esto no espera a que se carguen los recursos en segundo plano o las imágenes.
    
    'networkidle0': Espera hasta que no haya más de 0 solicitudes de red activas durante un período de 500 ms. 
    En otras palabras, espera hasta que no haya más actividad de red en la página.
    
    'networkidle2': Espera hasta que no haya más de 2 solicitudes de red activas durante un período de 500 ms. 
    Esta opción es similar a 'networkidle0', pero permite una pequeña cantidad de actividad de red adicional.
    */
    await page.goto('https://platzi.com',{waitUntil:'networkidle0'})


    //Espera explicita (no recomendada)
    await new Promise(resolve => setTimeout(resolve, 1000))


    //Espera por un css selector
    //se utiliza para esperar hasta que un elemento que coincide con un selector CSS 
    //específico esté presente en la página antes de continuar con la ejecución del código.
    await page.waitForSelector('img')


    //Esperar por un Xpath
    // es útil en situaciones en las que necesitas esperar hasta que un elemento 
    // basado en su ubicación relativa o estructura XML específica 
    // esté disponible antes de continuar con la ejecución del código
    await page.waitForXPath('//*[@id="Header-v2"]/nav[1]/div[1]/div/a/div/figure/img')


    await page.goto('https://demoqa.com/modal-dialogs',{waitUntil:'networkidle2'})
    
    const button = await page.waitForSelector('#showSmallModal',{ visible: true})

    //hidden: Espera hasta que el elemento esté oculto en la página.

    // timeout: Establece un tiempo máximo de espera en milisegundos. 
    //Si el elemento no está presente o no cumple con las condiciones especificadas dentro del tiempo de espera, se lanzará un error.

    // visible: Espera hasta que el elemento esté visible en la página. 
    //Esta opción es equivalente a { visible: true }, que se utiliza en tu ejemplo.

    // hidden: Espera hasta que el elemento esté oculto en la página.

    // state: Espera hasta que el elemento esté en un estado específico, 
    //como "enabled" (habilitado) o "disabled" (deshabilitado).

    await button.click()


    //Espera por funcion 
    await page.waitForFunction(()=> document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')
    //desglosando la funcion anetior
    //page.waitForFunction: espera por la funcion 
    //()=> document.querySelector: es un arrow function que no recibe arguemntos. solo procesa lo que le pedimos y devolvera true o false
    //'#example-modal-sizes-title-sm': el id del elemento que buscamos 
    //.innerText : nos trae el valor que tiene el elemento que seleccioanmos con el querySelecto
    // === 'Small Modal': evalua si el contendio del elemento es el mismo que le estamos pasando


/*
    //ejemplo para observar el viewport
    const observaResize = page.waitForFunction('window.innerWidth < 100')
    await page.setViewport({width:50, height:50})
    await observaResize
*/

    await page.click('#closeSmallModal')
    await page.waitForFunction(()=> !document.querySelector('#example-modal-sizes-title-sm'))
    
    await browser.close()

}, 35000);
});
