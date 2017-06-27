'use strict'

const Product = require('../models/product')

function getProduct (req, res) {
	let productId = req.params.productId

	Product.findById(productId, (err, product) => {
		if (err) return res.status(500).send( { message: `Error al realizar la petición` } )
		if (!product) return res.status(404).send( { message: `El producto con ID ${productId} no existe` } )

		res.status(200).send( { product } )
	})
}

function getProducts (req, res) {
	Product.find( {}, (err, products) => {
		if (err) return res.status(500).send( { message: `Error al realizar la petición` } )
		if (!products) return res.status(404).send( { message: `No existen productos en la DB` } )

		res.send(200, { products })
	})
}

function storeProduct (req, res) {
	console.log('POST /api/product')
	console.log(req.query)

	let product = new Product()
	product.name = req.query.name
	product.picture = req.query.picture
	product.price = req.query.price
	product.category = req.query.category
	product.description = req.query.description

	product.save( (err, productStored) => {
		if (err) return res.status(500).send( { message: `Error al salvar el producto` } )

		res.status(200).send({ product: productStored })
	})
}

function updateProduct (req, res) {
	let productId = req.params.productId
	let update = req.query

	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if (err) return res.status(500).send( { message: `Error al actualizar el producto con id ${productId}` } )
		res.status(200).send( { product: productUpdated } )
	})
}

function deleteProduct (req, res) {
	let productId = req.params.productId
	Product.findById(productId, (err, product) => {
		if (err) return res.status(500).send( { message: `Error al borrar el producto con id ${productId}` } )
		
		product.remove(err => {
			if (err) return res.status(500).send( { message: `Error al borrar el producto con id ${productId}` } )
			res.status(200).send( { message: `El producto ${productId} ha sido eliminado` } )
		})
	})
}

module.exports = {
	getProduct,
	getProducts,
	storeProduct,
	updateProduct,
	deleteProduct
}