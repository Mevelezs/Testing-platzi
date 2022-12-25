PRUEBAS ESTÁTICAS CON ESLINT.
1.0  npm i -D eslint;  instala

2.0 npm init @eslint/config; inicia la configuración.
2.1 To check syntax, find problems, and enforce code style;  tercera opción.
2.2 CommonJS (require/esports);  en éste proyecto es esta opción porque es solo node.
2.3 None of these; no se esta usando ningun framework.
2.4 No
2.5 Node
2.6 Use a popular style guide
2.7 Airbnb: https://github.com/airbnb/javascript; guia de airbnb.
2.8 JavaScript
2.9 yes.
2.10 npm.

3.0 crear una nueva tarea en los scripts del packege.json  "lint" : "eslint src/**" corre sobre el src y cualquier archivo que esté dentro.

3.1 "lint: fix":  "eslint src/**  --fix" para arreglar los errores en los archivos.

4.0 jest: true,  en el archivo .eslintrc.js habilitamos todo lo de jest (o cualquier otra libreria que ejecute métodos) para que lo reconozca.

5.0 Generando permisos en .elintrc.js para dependencias de desarrollo
en el objeto rules agrego la linea

---> 'import/no-extraneous-dependencies': ['error', { devDependencies: true }] <---


Metodologías

TDD (Test Driven Development): Desarrollo guiado por pruebas, donde primero se hacen las pruebas antes de escribir el código (primero los expects).

BDD (Behavior Driven Development): Desarrollo guiado por comportamiento de acuerdo a los requisitos y luego las pruebas.

AAA “Mantra” para hacer pruebas

_____ preparar Arrange | Given dado algo
_________ ejecutar Act | When cuando
resolver hipótesis Assert | Then entonces

concepto Falso Positívo Cuando una prueba indica un error, pero todo está bien, por ejemplo, testeando el método suma de 1 +1 y pongo el expect en 5, es un falso positivo, luego la prueba está mal.

c Falso Negativo Son más comunes, ya que parece que todo está normal, pero no se ha identificado el error, el set de pruebas debería ser más amplio; esto sucede cuando caemos en tan solo, probar el Happy Path, probar las condiciones en las que sabemos que el sistema funciona, por ejemplo, en el SUT de dividir las primeras pruebas salían bien porque no se tomó en cuenta la división entre cero 0, luego se hizo la prueba y el refactor. En caso de falso negativo lo mejor es aplicar TDD.

c SISTEMAS LEGACY : Son sistemas que te piden agregar pruebas a algo funcional, incluso en paralelo; hay que refactorizar los métodos enormes a pequeños para hacer unit test de pocos a muchos métodos; legacy no lleva una buena arquitectura.

c Clean Architecture Este patrón lleva buenas prácticas desde el principio, cada método está bien dividido y con responsabilidades acertadas, es mucho más facil de agregar el set de pruebas.

REPORTE DE PRUEBAS npm run test -- --coverage

Se genera una carpeta `coverage --> icon-report --> index.html` con un ejecutable que muestra el procentaje de código testeado.
