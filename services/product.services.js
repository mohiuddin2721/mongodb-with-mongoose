const Product = require('../models/Products');

exports.getProductService = async (query, quiresBySort) => {
    // console.log(query)
    const products = await Product.find(query)
        .skip(quiresBySort.skip)
        .limit(quiresBySort.limit)
        .sort(quiresBySort.sortBy)
    const totalProduct = await Product.countDocuments(quiresBySort);
    const pageCount = Math.ceil(totalProduct / quiresBySort.limit)
    return { totalProduct, pageCount, products };
}

exports.createProductService = async (data) => {
    const product = await Product.create(data)
    return product;
}

exports.updateProductService = async (productId, body) => {
    // const product = await Product.updateOne({ _id: productId }, { $set: body })
    // If you use direct 'updateOne', must use { runValidators: true } to validate according to product schema
    const product = await Product.updateOne({ _id: productId }, { $set: body }, { runValidators: true })

    // to increase specific data
    // const product = await Product.updateOne({ _id: productId }, { $inc: body }, { runValidators: true })


    // another way to validate
    // const product = await Product.findById(productId);
    // const result = await product.set(body).save();
    // return result;
    return product;
}

exports.bulkUpdateProductService = async (data) => {
    const result = await Product.updateMany({ _id: data.ids }, data.data, { runValidators: true })
    return result;


    // const products = [];
    // data.ids.forEach(product => {
    //     products.push(Product.updateOne({ _id: product.id }, product.data))
    // })
    // const result = await Promise.all(products);
    // return result;
}

exports.deleteProductByIdService = async (id) => {
    const result = Product.deleteOne({ _id: id })
    return result;
}

exports.bulkDeleteProductService = async (data) => {
    const result = Product.deleteMany({ _id: data.ids })
    return result;
}