API REST
- Express
- Mocha -> testing framework
- persistencia -> en memoria
- BDD -> Behavioral Driven Development

Navegador
	- Cliente de ejemplo
	- Postman=> cliente de HTTP para realizar solicitudes
Terminal
	makefile - ejecutar pruebas
	nodemon - reiniciar el servidor de node con cada cambio
Node
	- Express -> framework (servidor/API)
		- bodyParser
	- Mocha - Testing framework
		- Supertest -> http.client
		- Chaijs -> libreria de expectativas

# Anotame.la api básico

La primera implementación de un API de JSON para el cliente de anotamela, usando node.js, y express

## Instalación

```shell
  $ git clone https://github.com/buritica/anotamela-api-basico
  $ cd anotamela-api-basico
  $ npm install
```

## Ejecución

```shell
  $ node server
```

## Pruebas

```shell
  $ make test
```

# Pasos
- paso 1
  - crear directorio de pruebas
  - crear servidor de express
  - crear primera prueba
- paso 2
  - escribimos primera ruta, tests pasan
- paso 3
  - escribimos prueba para GET de una nota
- paso 4
  - escribimos ruta para GET /notas/:id
- paso 5
  - modularizamos el recurso notas
- paso 6
  - refactorizamos el recurso notas
- paso 7 promises
  - refactorisamos pruebas usando promises
- paso 8
  - escribimos prueba para PUT de una nota
- paso 9
  - escribimos ruta para PUT /notas/:id
- paso 10
  - escribimos prueba para DELETE de una nota
- paso 11
  - escribimos ruta para DELETE /notas/:id
- paso 12
  - escribimos prueba para GET de todas las notas
- paso 13
  - escribimos ruta para GET /notas/
