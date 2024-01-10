# ----------------------> Pruebas e2e <----------------------------
Jest y Supertest son dos herramientas que se utilizan comúnmente en el desarrollo de software en JavaScript para probar y evaluar aplicaciones, pero se enfocan en aspectos diferentes:

Jest:
Jest es un framework de pruebas unitarias y de integración para JavaScript. Se utiliza para escribir y ejecutar pruebas automatizadas que verifican el comportamiento de las diferentes partes de una aplicación. Jest proporciona una amplia gama de utilidades y funciones para escribir pruebas de manera efectiva. Algunas características destacadas de Jest incluyen:

Assertions Integradas: Jest incluye un conjunto de aserciones (assertions) integradas que permiten verificar que los resultados de las funciones y componentes sean los esperados.

Mocks y Espías: Jest ofrece herramientas para crear mocks y espías, lo que facilita la simulación de componentes o módulos externos en las pruebas.

Testing Asincrónico: Jest maneja de manera efectiva las pruebas asincrónicas utilizando funciones como async/await o el uso de las funciones globales setTimeout y setInterval.

Snapshot Testing: Jest es conocido por su característica de “snapshot testing”, que permite capturar el estado actual de un componente y luego compararlo con futuras ejecuciones para detectar cambios no deseados.

Supertest:
Supertest, por otro lado, es una biblioteca que se utiliza para probar APIs HTTP en aplicaciones Node.js. Su principal objetivo es simular solicitudes HTTP y evaluar las respuestas obtenidas desde una perspectiva externa. Algunas características de Supertest son:

Solicitudes HTTP Simuladas: Supertest permite realizar solicitudes HTTP (GET, POST, PUT, DELETE, etc.) a una API simulada o en ejecución.

Evaluación de Respuestas: Con Supertest, puedes verificar las respuestas HTTP recibidas, como los códigos de estado, encabezados y cuerpo de respuesta.

Uso con Otros Marcos de Pruebas: Supertest se utiliza comúnmente en combinación con frameworks de pruebas como Mocha o Jest para probar APIs y servicios.

En resumen, Jest se enfoca en las pruebas unitarias e integración de código JavaScript en general, mientras que Supertest está diseñado específicamente para probar APIs HTTP y servicios en Node.js. Dependiendo de tus necesidades, podrías utilizar Jest para probar la lógica interna de tus componentes y funciones, y Supertest para probar las interacciones HTTP de tu aplicación.

# --------> Instalando y configurando Jest con Node <-------------
1.`npm i jest -D`
2. Prueba de funcionamiento => egregemos un acarpeta en la reiz (e2e) => primer archivo de prueba
3.Para poder correr la primera prueba queamos en el package.json un scrip `"e2e": "jest"`
4. Coreemos el comando `npm run e2e`

## ---> Configiraciones adicionales para los e2e <----
1. En la raiz del proyeto creamos un json con la configuración
 ```sh
   {
      "moduleFileExtensions": ["js"], // Extensiones que va a evaluar
      "rootDir": ".", // ruta desde donde se evalua el archivo
      "testEnvironment": "node", // Entorno de pruebas
      "testRegex" : ".e2e.js$" // Garantiza que se corran las pruebas e2e 
                                       (el $ quere decir que termina en)
   }
 ```
 2. reajustamos el script que corre los archivos jest y le pasamos la configuración que acabamos de crear `"e2e": "jest --config ./jest-e2e.json --verbose  --detectOpenHandles --forceExit"` (--verbose para que de mas info de las pruebas ,--detectOpen... es para ver que esta quedando pendiente en las pruebas (ciclos ascincronos abiertos), forExit para asegurar el cierre de los test de alguna manera)

# --------> Instalando Supertest para probar el servidor <--------
1. `npm i supertest -D`
## -------> Creacion de nuestra primera prueba <--------
1. Creamos en la carpeta e2e un nuevo archivo app.e2e.js
2. Importamos supertest
3. Importamos express
4. Creamos una pequeña aplicación => le agregamos un endpoint
5. Ponemos la aplicación a correr
6. Declaramos una variable que istancie supertest y le mandamos la app => Hacemos las pruebas a la app que acabamos de montar => pruebas en app.e2e.js

## --------> Buenas prácticas en pruebas E2E <----------

1. Usar los hooks de jest para iniciar el servidor y cerarlo cuando las pruebas terminen https://jestjs.io/docs/api#reference

2. Cada archivo prueba un path especifico (ej: un archivo para users, prueba todo lo de user)

3. Mantra se las tres A
* Arrange => Preparar los datos o recursos que van a ser utilizados en
la prueba (crear usuarios, hacer peticiones http...)
* Act => Hacer la acción que vamos a probar (hacer la
petición http...)
* Assert => Verificar si se obtuvo el resultado esperado (comprobar status
de la respuesta, verificar contenido...).

4- Jest siempre corre las pruebas en paralelo osea que para cada archivo levanta un servidor, y si todos corren en el mismo puerto puede haber colisiones; para evitar esto configuramos el comando que corre las pruebas para que las haga en secuencia.
 "e2e": "jest --config ./jest-e2e.json --verbose --forceExit `--runInBand"`

# --> Configurando el entorno de pruebas para nuestro proyecto <--
1. Nescesitamos separar el set up de a aplicación del listen => creamos un archivo dentro de src app.js qreamos una fincion que va acontener la instancia del app, pasamos todo el set up  y exportamos la función
2. Una vez separados se puede importar tanto como al index.js donde corre la aplicación com al entorno de pruebas

# --------------------> Coverage Report <------------------

1. El reeporte de covertura es un indicador de cuanto se ha testeado en el código (no gerantiza que las pruebas sean correctas pero si que puntos de la aplicación se han testeado)

2. Para activarlo debemos ir al package.json y agregar una lonos similal a la que corre las pruebas 
"e2e:coverage": "jest --config ./jest-e2e.json --verbose --forceExit `--coverage"`

3. Al correr el comando se muestra un reporte en la terminal y se agrega una carpeta con un index.html que muestra de forma grafica el estado de la covertura de pruebas en el app

4. Si se tienen varios tipos de pruebas, el reporte se harápara todas; para tener un reporte a parte de la covertura de pruebas e2e, en el json de configuración de las e2e se agrega una linea de codigo que lo que hace es crear una carpeta a parte para las e2e => hay que meterla en al git ingore porque a diferencia de la principal, no lo hace
{
  "moduleFileExtensions": ["js"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e.js$",
  `"coverageDirectory": "coverage_e2e"`
}

# ----------> Probando el contenido del app <--------------

## -----------> Pruebas a Schemas o DTOs <--------------

1. Para la validación de los Dtos enviamos datos invalidos al enpoind del api y debería devolvernos las respuestas conrrespondiente

2. Para cada path hay que lanzar la aplicación

3. Hay una función que nos esta trayendo la data explicita de la peticion y el error en la consola => src/middlewares/error.handler.js => errorHadler => acitavr al los para ver la data

## ------------> Pruebas a endpoints GET <--------------
1. Para hacer con exito las pruebas que conllevan un request a la base de datos, por ningún motivo se debe olvidar tenerla encendida(siestá en un contenedor o en la nube y esta apagada)

2. La magia de las pruebas e2e es que pueden comprobar y contrastar directamente con lo que hay en la base de datos real. => para hacer estas pruevas importamos el modulo que se conecta a la base de datos, hacemos la petición directamente y contrastamos con lo que nos responde el app

## ----------------> Pruebas al Login <------------------

1. Creamos el archivo para auth => importamos la app => nada particularmente diferente a las anteriores

## ----------> Pruebas a rutas con protección <-----------
1. Provamos la ruta que está en el directamente en el app y con el path /nueva-ruta
que necesita una apikey

2. para mandarle datos como al apiKey seteamos en la petición un objeto con el parametro (nombre esperado en los headers) y el valor esperado dentro de un .set 
`const { statusCode } = api.get('/nueva-ruta').set({api : '1234' });`

3. Para obtener la variable que ezta en el .env simplemente importamos el archivo de configuración.

Probado en myApp.e2e.js

## ---------> Pruebas a rutas con accessToken <-----------
