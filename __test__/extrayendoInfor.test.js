const puppeteer = require('puppeteer');

describe('Extrayendo informacion', () => {

  it('Extraer el titulo de la pagina', async () => {
    
    const browser = await puppeteer.launch({
      headless:false,
      defaultViewport: null
    })

    const page = await browser.newPage()
    await page.goto('https://platzi.com',{ waitUntil: 'networkidle0'})
    // const titulo = await page.title()
    // const url = await page.url()

    // console.log('titulo',titulo,'url', url)

    await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-desktopCtas > div.Menu > div > div > ul > li:nth-child(8) > a')
    const nombreBoton = await page.$eval('#Header-v2 > nav.Nav-header.Nav-header-desktopCtas > div.Menu > div > div > ul > li:nth-child(8) > a', (button)=>button.textContent)
    //page.$eval:  para interactuar con un elemento específico de la página y extraer información o realizar acciones en base a ese elemento.
    //'#Header-v2... >a':es el elemento al que estamos apuntado 
    //(button)=>button.textContent : recibe el argumento (el elemento seleccionado anteriormente) y devuelve su contenido
    console.log('nombre del boton', nombreBoton)

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
  //[button]: Esta es la notación de desestructuración de JS. Se utiliza para extraer un elemento de un array
  //page.$x: Es un método proporcionado por Puppeteer que busca elementos en la página web utilizando una expresión XPath. 
  //         Retorna una promesa que se resuelve en un array de elementos coincidentes con la expresión XPath proporcionada
  // '//*.../li[8]/a': es el elemento en formato XPath
  const propiedad = await button.getProperty('textContent')
  //button.getProperty('textContent): devuelve el contenido dentro del elemento que se selecciono con XPath y se guardo en al const button en un formato JSHandle
  const texto = await propiedad.jsonValue()
  // propiedad.jsonValue():  Utiliza el método jsonValue() del objeto propiedad para obtener el valor de la propiedad en formato JSON. 
  //                         Este método devuelve una promesa que se resuelve en el valor de la propiedad.

  console.log('texto', texto)

  //Segunda forma 
  const texto2 = await page.evaluate((name)=> name.textContent, button)
  // page.evaluete(): te permite ejecutar código JavaScript en el contexto de la página web controlada por Puppeteer, 
  //                  lo que te brinda la capacidad de interactuar con el DOM y realizar diversas acciones en la página.
  //(name)=> name.textContent: recibe un elmento y regresa el contenido de este
  //button: es el elemento que anteriormente se obtuvo, y dentro de evaluete la función toma el elemento button como argumento 
  //        y devuelve el valor de la propiedad textContent del elemento.

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


  const images = await page.$$eval('img', (imagenes)=>imagenes.lenght )
  //page.$$eval(): evalúa una función en el contexto de múltiples elementos seleccionados por un selector CSS.
  //'img': Es el selector. En este caso, se seleccionan todos los elementos <img> en la página
  //(imagenes) => imagenes.length: Toma un argumento imagenes, que representa los elementos <img> seleccionados, 
  //                               y devuelve la longitud (cantidad) de esos elementos.
  console.log('images', images)


  await browser.close()
}, 35000);
});
