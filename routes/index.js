'use strict'

const express = require('express')
const ProductController = require('../controllers/product')
const UserController = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

// Routes

api.get('/product', auth, ProductController.getProducts)
api.get('/product/:productId', ProductController.getProduct)
api.post('/product', ProductController.storeProduct)
api.put('/product/:productId', ProductController.updateProduct)
api.delete('/product/:productId', ProductController.deleteProduct)
api.post('/signup', UserController.signUp)
api.post('/signin', UserController.signIn)
api.get('/users', UserController.getUsers)

module.exports = api