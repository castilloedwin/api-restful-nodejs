'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
	const user = new User({
		email: req.query.email,
		displayName: req.query.displayName,
		password: req.query.password
	})

	user.save( (err) => {
		if (err) return res.status(500).send( { message: `Error al crear el usuario ${err}` } )
		return res.status(201).send( { token: service.createToken(user) } )
	})
}

function signIn (req, res) {
	User.find( { email: req.query.email }, (err, user) => {
		if (err) return res.status(500).send( { message: err } )
		if (!user) return res.status(404).send( { message: 'Este usuario no existe' } )

		
		res.status(200).send( { message: 'Te has logueado correctamente', token: service.createToken(user), user } )
	})
}

function getUsers(req, res) {
	User.find( {}, (err, users) => {
		if (err) return res.status(500).send( { message: `Error al realizar la petición` } )
		if (!users) return res.status(404).send( { message: `No existen productos en la DB` } )

		res.send(200, { users })
	})
}

module.exports = {
	signUp,
	signIn,
	getUsers
}