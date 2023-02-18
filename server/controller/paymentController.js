const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = require('stripe')(STRIPE_SECRET_KEY)
const Product = require('../models/products.models')



const buy = async (req, res) => {
    const { items } = req.body
    const items_ids = items.map(item => item.id)

    const products = await Product.findAll({
        where: {
            id: items_ids
        }
    })

    try {
        const stripe_session = await stripe.checkout.sessions.create({
            payment_method_types: ['card',],
            mode: 'payment',
            invoice_creation: { enabled: true },
            line_items: items.map(item => {
                // const storeItem = Product.get(item.id);
                const storeItem = products.find(product => product.id === item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        })
        res.json({
            message: 'Success',
            url: stripe_session.url
        })
    } catch (err) {
        console.log(err)
    }


}

module.exports = {
    buy
}