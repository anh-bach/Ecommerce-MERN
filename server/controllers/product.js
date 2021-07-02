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

exports.update = catchAsync(
  async (req, res) => {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );

    res.json(product);
  },
  'from update product',
  400
);

exports.list = catchAsync(
  async (req, res) => {
    //createdAt/updatedAt, desc/asc, limit
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage);

    res.json(products);
  },
  'from list product',
  400
);

exports.productsCount = catchAsync(
  async (req, res) => {
    const total = await Product.estimatedDocumentCount({});

    res.json(total);
  },
  'from list product',
  400
);
