const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Place an order
exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const totalPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const order = new Order({
      user: req.user.id,
      items: cart.items,
      totalPrice,
    });

    await order.save();

    // Update stock for products
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      product.stockQuantity -= item.quantity;
      await product.save();
    }

    // Clear cart after placing order
    await cart.remove();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
