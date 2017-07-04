'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')
const bcrypt = require('bcrypt-nodejs')

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
	User.findOne( { email: req.body.email }, (err, user) => {

		if (err) throw err

		user.comparePassword(req.body.password, (error, isMatch) => {
			if (!isMatch) return res.status(403).send( { message: 'Las credenciales no coinciden' } )

			req.user = user	
			return res.status(200).send( { message: 'Te has logueado correctamente', token: service.createToken(user), user } )
		})
	})
}

function getUsers(req, res) {
	User.find( {}, (err, users) => {
		if (err) return res.status(500).send( { message: `Error al realizar la petición` } )
		if (!users) return res.status(404).send( { message: `No existen productos en la DB` } )

		res.status(200).send({ users })
	})
}

module.exports = {
	signUp,
	signIn,
	getUsers
}