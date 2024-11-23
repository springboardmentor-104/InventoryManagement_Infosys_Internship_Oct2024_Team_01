const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Place an order
exports.placeOrder = async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    // Fetch cart for the user
    const cart = await Cart.findOne({ user: req.userId }).populate('products.productId');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or invalid' });
    }

    const totalPrice = cart.products.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    // Create order
    const order = new Order({
      user: req.userId,
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalPrice,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    });

    await order.save();

    // Deduct stock
    for (const item of cart.products) {
      const product = await Product.findById(item.productId._id);
      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }
      product.stockQuantity -= item.quantity;
      await product.save();
    }

    // Clear cart after placing order
    await Cart.findOneAndDelete({ user: req.userId });


    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ success: false, message: 'Error placing order', error });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('products.productId', 'name price images') // Populate product details
      .sort({ createdAt: -1 });

    // Format the orders for the response
    const formattedOrders = orders.map((order) => ({
      id: order._id,
      date: order.createdAt.toISOString(),
      status: order.status,
      total: order.totalPrice,
      products: order.products.map((item) => ({
        product: {
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          image: item.productId.images?.[0] || null,
        },
        quantity: item.quantity,
        totalPrice: item.price || item.productId.price * item.quantity,
      })),
    }));

    res.status(200).json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error('Error fetching user orders:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching user orders', error });
  }
};



// Get single order details (for "My Orders" or admin view)
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch the order and populate product details
    const order = await Order.findById(orderId)
      .populate('user', 'name email') // Populate user details (optional)
      .populate('products.productId', 'name price images'); // Populate product details

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Format the response
    const formattedOrder = {
      id: order._id,
      user: {
        id: order.user?._id || null,
        name: order.user?.name || null,
        email: order.user?.email || null,
      },
      products: order.products.map((item) => ({
        product: {
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          image: item.productId.images?.[0] || null,
        },
        quantity: item.quantity,
        totalPrice: item.price || item.productId.price * item.quantity,
      })),
      total: order.totalPrice,
      status: order.status,
      date: order.createdAt.toISOString(),
      razorpayDetails: {
        paymentId: order.razorpayPaymentId,
        orderId: order.razorpayOrderId,
        signature: order.razorpaySignature,
      },
    };

    res.status(200).json({ success: true, order: formattedOrder });
  } catch (error) {
    console.error('Error fetching order details:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching order details', error });
  }
};
