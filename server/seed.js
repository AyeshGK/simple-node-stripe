const Product = require('./models/products.models')


Product
    .sync({ force: true }) // force: true will drop the table if it already exists
    .then(() => {
        console.log('Products table created')
        return Product.bulkCreate([
            {
                id: '1234x',
                name: 'xl-tshirt',
                priceInCents: 100,
                description: 'extra large tshirt'
            },
            {
                id: '2345y',
                name: 'trousers',
                priceInCents: 200,
                description: 'trousers'
            },
            {
                id: '3456z',
                name: 'underwear',
                priceInCents: 50,
                description: 'underwear'
            },
            {
                id: '4567a',
                name: 'socks',
                priceInCents: 20,
                description: 'socks'
            },
            {
                id: '5678b',
                name: 'shoes',
                priceInCents: 300,
                description: 'shoes'
            }
        ])
    });


