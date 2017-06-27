'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')


// Start server

mongoose.connect(config.db, (err, res) => {
	
	if (err) {
		return console.log('Error al conectarse a la DB de Mongo')
	}

	console.log('Conexión a MongoDB OK');

	app.listen(config.port, () => {
		console.log(`Corriendo servidor ${config.port}`)
	})
})