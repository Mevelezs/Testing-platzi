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

1. Creamos el archivo que va a provar en al path protegido /profile/my-user.

2. El enpoind trae la info del usuario que está logueado.

3. El access_token de la peticion viaja en el header con un protocolo Bearer de esta forma : `{Authorization: 'Bearer º12123e'}`, por tanto podemos requrirlo desde ahí con un set.

4. Para tener un access token valido toca obligatoriamente hacer un login, asi que lo hacemos y comparamos los datos.

5. Como buena practica colocamos el lging del usuario dentro de dun beforeAll dentro de la suite de prueba; con una variable global guardamos el token, lo asignamos dentro de la suit y lo limpiamos una vez acabado. Esto por si tenemos que hacer login con varios tipos de usuarios.

## -------------> Pruebas a endpoints POST <---------------
1. Regla de oro => Cada prueba debería tener su propio escenario de datos sin que este influya en pruebas posteriores.

 1.1 No se prueba con la db de producción.

 1.2 No se debería probar con la db de desarrollo, no es facil de mantener y perjudica las pruebas posteriores.

 1.3 Evitar crear datos manualmente.

 1.4 Tener un escenario de pruebas que se pueda replicar en cada prueba o archivo de pruebas

### ----> Preparando el ambiente de pruebas e2e <----
1. En el archivo de docker creamos un nuevo servicio de postgres con diferente puerto y sin volumen de persistencia.

2. Creamos las variables de ambiente para la db de pruebas.

3. Nos vamos al config para hacer que lea las nuevas variables de entorno dependiendo del ambiente
 /src/config/config.js.

4. Para que cargue el ambiente automativamente desde la terminal en el scrip que hace la terea de ejecuter las pruebas y al de coverage le sumamos 'NODE_ENV=e2e' => 
`"e2e": "NODE_ENV=e2e jest --config ./jest-e2e.json --verbose  --detectOpenHandles --forceExit",`.


### ------> Creando un seed de datos manual <---------
1. Creamos una carpeta dentro de e2e (utils) => creamos el archivo (seed) => creamos dos funciones que interactuen con la db de pruebas, una para poblar y otra para borrar los datos => importamos la conección con sequelize y la usamos de forma sincrona para que se cree la estructura automaticamente aprovechando que no necesitamos persistir => importamos los modelos para crear la data => hacemos los mocks manuales (siempre dentro de un try-cash por si algo sale mal) => importamos la funciones en cada set de pruebas y la ejecutamos al inicio y final.

# ------------> Seed de datos con sequelize <--------------
https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-seed

1. Se tienen que crear en una carpeta especial (seeders); al lado de la de migración.

2. Se crean seeds poe documento de prueba.

3. Copiamos el template de la documentación y lo añadimos a nuetro primer archivo seed.

4. Los seeds de informaciósn se corren dependiendo de como estén organizados los archivos (si los enumeramos se respetará el orden numérico).

5. Los nombres usados para la creación de los atributos de sierto seed deben ser los mismos con los que se crea en la base de datos (modelos => ej  `createdAt: {field: 'created_at'}`).

6. Creamos una tarea en el package.json para correr los seeds y para borrarlos.
` "seed:all": "sequelize-cli db:seed:all"`
`"seed:undo": "sequelize-cli db:seed:undo:all"`

7. En el archivo .sequelizerc se configura el path donde van a correr los seeds
  `'seeders-path': './src/db/seeders/'`

8. Es recomendable vaciar la base de datos para tener los datos incertados por las semillas (esto si se quiere poblar la base de datos de desarrollo automaticamente, sino se sigue haciendo desde insomnia o ...)

# -> Umzug: corriendo los seeds de datos para pruebas e2e <-

https://github.com/sequelize/umzug

1. Hasta ahora el seeds de informacion nos sirven para poblar la db, ahora usaremos umzug para nuestro entorno de pruebas y sembrar las semillas para la db de prueba.

2. Instalar `npm i umzug`

3. Creamos un archivo (umzug.js) y lo configuramos .

4. LLamamos las funciones en los entornos de prueba (tener en cuenta que llamamos las funciones de umzug para subir  y bajar la db igual a la de sequileze).

5. Cuando corremos las migraciones o seeds por la linea de comando, el queryInterface que es parametro en las funciones que levantan cada una de las pruebas (/db/seeds/*.js) llega de forma directa; pero cuando usamos umzug llegan en un sub contexto y hay que extraerla. => en cada seed hay que preguntar si viene el contexto (en el up y en el down).
```js
if(queryInterface.context){
  queryInterface = queryInterface.context
}
```

# ----------------> Mocking en Node.js <------------------
1. En las pruebas e2e regularmente se evita hacre mocking pero hay casos en que no se puede evitar como por ejemplo servicios de terceros o apis externas => para este caso usaremos mocks para simular el servicio de correo de node-mailer

# ----------> Automatizacion en GitHub Actions <----------

1. Creamos una carpeta al mismo nivel de src .github.

2. Dentro de esta carpeta creamos otra carpeta workflows.

3. Creamos un archivo .yml

4. Lo que queremos hacer en el ambiente de ci es hacer todo lo que se hace cuando corremos el comando npm run e2e pero en la nube cada vez que se hace un commit.

5. La configuración del script que tenemos para correr las pruebas nos manda directamente un entorno de node  => vamos a crear una tarea especifica para el entorno de integración continua
  `"e2e:ci": "jest --config ./jest-e2e.json --verbose  --detectOpenHandles --forceExit"`
Para no cambiar la configuración del config lo modificamos, esto actua así; ,
    `"e2e:ci": "NODE_ENV=ci jest --config ./jest-e2e.json --verbose  --detectOpenHandles --forceExit"`
si no encuentra el entorno señalado en el script en el  archivo de configuración, lo sale a buscar a la maquina en que está corriendo y carga las variables de entorno puestas en el documento de integración api-ci.yml

El archivo de configuración quedaria de esta manera

```yml
name: API CI => nombre

on: => cuando y donde se corren las pruebas
  push: => cada que se hace un push corre las pruebas
    branches:  ['e2e']=> ramas sobre las cuales se corren
  pull_request : => cada que se hace un pull corre las pruebas
    branches: ['main, master']


jobs: => tabajos que vamos a hacer
  e2e: => nombre de la tarea
    runs-on : ubuntu-latest => sobre que las va a correr
    container: => añade contenedor con SO
      image: node:16

    services: => Un contenedor tipo docker para alojar la db.
      postgres-e2e:
        image: postgres:13
        env: => enviroments
          POSTGRES_DB: db_e2e
          POSTGRES_USER: e2e
          POSTGRES_PASSWORD: e2e123
        ports:
          - 5432:5432

    steps: => pasos
    - name: Checkout
      uses: actions/checkout@v3 => clona el codigo del repo.
    - name: Install
      run: npm ci => instala las dependencias cons istalador de github Actions
    - name: run e2e
      run: npm run e2e:ci
      env: => variables de entorno
        PORT: 3000
        DATABASE_URL: postgres://e2e:e2e123@postgres-e2e:5432/db_e2e => en lugal de localhost se pone el nombre del servicio
        API_KEY: 79823
        JWT_SECRET: 'My stupid key'
        SMTP_EMAIL: your@email.com
        SMTP_PASSWORD: password-email

```

6. Despues e que está todo listo guardamos el commit y hacemos push
