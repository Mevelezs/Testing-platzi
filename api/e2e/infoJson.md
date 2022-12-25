Las pruebas e2e se ejecutan en un archivo aparte; tambien se necesita un documento .json con configuracón especifica para decirle a jest como debe correr nuestras pruebas de integración.

1.0
inatalamos supertest.

2.0
creamos la carpeta de e2e y configuramos el jest-test.json de la carpeta

{
  "moduleFileExtensions": ["js"], ---> extension de los archivos
  "rootDir": "·",                 ---> ruta principal (el punto significa desde la raíz)
  "testEnvironment": "node",      ---> ambiente de pruebas
  "testRegex": ".e2e.js$"         ---> expresión regular para reconocer las pruebas (en lugar de reconocer el archivo test, que reconosca el e2e.test (configuración particular para este proyecto))
}

3.0
Finalmente para correr las pruebas configuramos el comando que ejecuta el supertest en el package.json diciendole  que corra la configuracion que acabamos de crear y un comando para que pare si algo sale mal.
"test:e2e":"jest --config ./e2e/jest-e2e.json --forceExit"
