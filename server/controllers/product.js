const slugify = require('slugify');

const Product = require('../models/product');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(
  async (req, res) => {
    req.body.slug = slugify(req.body.title);

    const product = await new Product(req.body).save();
    res.json(product);
  },
  'from create product',
  400
);

exports.listAll = catchAsync(
  async (req, res) => {
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']]);
    res.json(products);
  },
  'from create product',
  400
);

exports.remove = catchAsync(
  async (req, res) => {
    const deleted = await Product.findOneAndRemove({ slug: req.params.slug });
    res.json(deleted);
  },
  'from remove product',
  400
);

exports.read = catchAsync(
  async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category')
      .populate('subs');

    res.json(product);
  },
  'from read single product',
  400
);
