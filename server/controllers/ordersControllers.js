const Order = require('../models/orderModel')
const httpStatusText = require('../utils/httpStatusTexr')
const getAllOrders = async (req, res) => {
    try {
        const products = await Order.find({}, {"__v": false});
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { products } });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
};
const addOrder = async (req, res) => {
    const { id, items } = req.body;
    console.log(id,items);
    if (!id || !items || items.length === 0) {
        return res.status(400).json({ error: 'Invalid request. Customer or items not provided' });
    }
    try {
        const newOrder = new Order({ id, items });
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (err) {
        res.status(500).json({ error: 'Error creating order' });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const deletedOrder = await Order.deleteOne({ _id: orderId });
        if (deletedOrder.deletedCount === 1) {
            res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ error: 'Error deleting order', details: err.message });
    }
};
module.exports ={ 
    addOrder,
    getAllOrders,
    deleteOrder
}