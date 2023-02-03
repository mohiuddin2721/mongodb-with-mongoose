// const Product = require('../models/Products');
const { getProductService,
    createProductService,
    updateProductService,
    bulkUpdateProductService,
    deleteProductByIdService,
    bulkDeleteProductService
} = require("../services/product.services");


exports.getProduct = async (req, res) => {

    try {
        let objectQuery = { ...req.query };

        const excludeQuery = ['page', 'limit', 'sort']
        excludeQuery.forEach(field => delete objectQuery[field])
        // console.log('original query:', req.query);
        // console.log('query object:', objectQuery);

        // console.log(req.query.sort);

        // gt, gte, lt, lte
        let filterString = JSON.stringify(objectQuery)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        objectQuery = JSON.parse(filterString)

        const quires = {}
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            quires.sortBy = sortBy;
            // console.log(sortBy);
        }

        // pagination
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            quires.skip = skip;
            quires.limit = parseInt(limit);
        }
        const products = await getProductService(objectQuery, quires)

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
        if (!result.deletedCount) {
            return res.status(400).json({
                status: "Fail",
                error: "Couldn't delete the product"
            })
        }

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
exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const result = await bulkDeleteProductService(req.body)
        res.status(200).json({
            status: 'Success',
            message: 'Products are deleted successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't delete these products",
            error: error.message
        })
    }
}