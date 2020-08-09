config = {
    port: 5000,
    BD: 'mongodb://mongo:27017/shop',
    token: {
        secretToken: 'MiClaveDeToken',
        expired: {
            value: 14,
            timeDescription: 'days'
        }
    },
    whiteList: []
}

module.exports = config