const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
const Coupon = require('../models/coupon');
const catchAsync = require('../utils/catchAsync');

exports.userCart = catchAsync(
  async (req, res) => {
    const { cart } = req.body;

    let products = [];
    const user = await User.findOne({ email: req.user.email });

    //check if cart with logged in user id already exists
    let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id });

    if (cartExistByThisUser) {
      cartExistByThisUser.remove();
      console.log('remove old cart');
    }

    //pushing product into products array
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      //get price for creating total
      let { price } = await Product.findById(cart[i]._id).select('price');
      object.price = price;
      products.push(object);
    }
    //Calculating cart total
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].count;
    }

    //creating and saving newCart in db
    let newCart = await new Cart({
      products,
      cartTotal,
      orderedBy: user._id,
    }).save();

    res.json({ ok: true });
  },
  'from post user cart',
  400
);

exports.getUserCart = catchAsync(
  async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    let cart = await Cart.findOne({ orderedBy: user._id }).populate(
      'products.product',
      '_id title price totalAfterDiscount'
    );

    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount });
  },
  'from read user cart',
  400
);

exports.emptyCart = catchAsync(
  async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    let cart = await Cart.findOneAndRemove({ orderedBy: user._id });

    res.json(cart);
  },
  'from empty user cart',
  400
);

exports.saveAddress = catchAsync(
  async (req, res) => {
    await User.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address }
    );
    res.json({ ok: true });
  },
  'from save user address',
  400
);

exports.applyCouponToUserCart = catchAsync(
  async (req, res) => {
    const { coupon } = req.body;

    const validCoupon = await Coupon.findOne({ name: coupon });
    if (!validCoupon) {
      return res.json({ err: 'Invalid Coupon' });
    } else {
      const user = await User.findOne({ email: req.user.email });
      let { products, cartTotal } = await Cart.findOne({
        orderedBy: user._id,
      }).populate('products.product', '_id title price');

      //calculate total after discount
      let totalAfterDiscount =
        cartTotal * (1 - validCoupon.discount / 100).toFixed(2);

      await Cart.findOneAndUpdate(
        { orderedBy: user._id },
        { totalAfterDiscount },
        { new: true }
      );

      res.json(totalAfterDiscount);
    }
  },
  'from apply coupon',
  400
);
