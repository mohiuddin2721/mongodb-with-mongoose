// const Product = require('../models/Products');
const { getProductService,
    createProductService,
    updateProductService,
    bulkUpdateProductService,
    deleteProductByIdService
} = require("../services/product.services");


exports.getProduct = async (req, res) => {
    try {
        const products = await getProductService()
        res.status(200).json({
            status: "success",
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Can't get the data",
            error: error.message
        })
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        // save or create
        // using save
        // const product = new Product(req.body)
        // if (product.quantity == 0) {
        //   product.status = 'out-of-stock'
        // }
        // const result = await product.save()

        // using create
        const result = await createProductService(req.body)
        result.logger()

        res.status(200).json({
            status: 'Success',
            message: 'Data inserted successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: error.message
        })
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductService(id, req.body)
        res.status(200).json({
            status: 'Success',
            message: 'Data updated successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't update the product",
            error: error.message
        })
    }
}

exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductService(req.body)
        res.status(200).json({
            status: 'Success',
            message: 'Data updated successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't update the product",
            error: error.message
        })
    }
}

exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductByIdService(id)
        res.status(200).json({
            status: 'Success',
            message: 'Product deleted successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't delete the product",
            error: error.message
        })
    }
}