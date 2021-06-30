const express = require('express');

//controllers
const {
  create,
  listAll,
  remove,
  read,
  update,
} = require('../controllers/product');
//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

//routes
router.post('/product', authCheck, adminCheck, create); //using AdminRoute instead - but we can use adminCheck if we do request from Postman
router.get('/products/:count', listAll);
router.get('/product/:slug', read);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.put('/product/:slug', authCheck, adminCheck, update);

module.exports = router;
