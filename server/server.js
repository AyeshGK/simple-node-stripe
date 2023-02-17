require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors({
    origin: 'http://127.0.0.1:5500' // <-- your client app url (live server)
}))

const storeItems = new Map([
    ['1234x', { priceInCents: 100, name: "xl-tshirt" }],
    ['2345y', { priceInCents: 200, name: "trousers" }],
    ['3456z', { priceInCents: 50, name: "underwear" }],
])

app.post('/buy', async (req, res) => {
    const { items } = req.body

    try {
        const stripe_session = await stripe.checkout.sessions.create({
            payment_method_types: ['card',],
            mode: 'payment',
            invoice_creation: { enabled: true },
            line_items: items.map(item => {
                const storeItem = storeItems.get(item.id);
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


})


// Path: server\server.js
const { PORT, STRIPE_SECRET_KEY } = process.env

const stripe = require('stripe')(STRIPE_SECRET_KEY)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))