Doubles

Dummy: Son datos ficticios para llenar información.

Fake: Son objetos que simulan comportamientos o datos; como un usuario ficticio.

Stubs: Son proveedores o APIs de tatos preparados (BD Clima).

Spies: Son como los stubs, pero se dejan espiar su comportamiento, comunicación e invocación.

Mocks: Stubs + Spies, pueden estar pre-programados para enviar las respuestas supuestas.

```yml
name : API CI
# on: [push]  cada que se haga un commit se corre éste archivo, config para repos sensillos
on:
  push:
    paths:
      - "./api/**" # configuracíon para proyectos que tienen mś de un repo, aqui se ejecuta cuando hay cambios en la carpeta api
      - ".github/workflows/api-ci.yml" # tambien se ejecuta con este archivo

defaults:
  run:
    working-directory: ./api # directorio de trabajo por default, tambien se puede obviar si hay un solo repo

jobs: # aquí se configuran los requerimientos del proyecto
  unit-test: # job que va a correr la pruebas unitarias, nombre ramdom
    runs-on: ubuntu-lates # maquina en la que corre (puede ser cualquier sistema operativo)
    steps: # Pasos
      - name: Checkout # chequea el repo
        uses: actions/checkout@v3 # comando y version que tiene github para clonar el repo
      - name: Setup Nodejs # configurando node
        uses: actions/setup-node@v3 # accion para conf. node
        with: # con
          node-version: 14 # versión de node
          cache: 'npm' # solicitando cahé
          cache-dependency-path: ./api/packege-lock.json # de donde sale el cahé
      - name: install #instalando dependencias
        shell: bash # terminal de tipo bash
        run: npm ci # ó install el ci es un comando que tiene node para pruebas de integración continua
      - name: run unit test # corriendo las pruebas
        shell: bash
        run: npm run test
```