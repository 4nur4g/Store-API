const Product = require('../models/product');
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('name price');
  res.status(200).json({
    products,
  });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = {
      $regex: name,
      $options: 'i',
    };
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(',').join('');
    result = result.sort(sort);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    console.log(fieldsList);
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await result.skip(skip).limit(limit);

  res.status(200).json({
    products,
    nbHits: products.length,
    page,
    limit,
  });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
