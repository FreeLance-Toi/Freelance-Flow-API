const axios = require("axios")

module.exports = (app) => {
    app.get('/api/v1/conversion', async (req, res) => {
        let value = req.query.value
        let baseCurrency = req.query.from
        let targetCurrency = req.query.to
        if(!value)
            return res.status(400).json({error: 'Missing value query parameter'})
        if(!baseCurrency)
            baseCurrency = 'EUR'
        if(!targetCurrency)
            return res.status(400).json({error: 'Missing to query parameter'})
        baseCurrency = baseCurrency.toUpperCase()
        targetCurrency = targetCurrency.toUpperCase()
        const data = (await axios.get('https://open.er-api.com/v6/latest/EUR')).data
        if (baseCurrency === 'EUR')
            res.status(200).json({value: value * data.rates[targetCurrency]})
        else if (targetCurrency === 'EUR')
            res.status(200).json({value: value / data.rates[baseCurrency]})
        else
            res.status(200).json({value: value * data.rates[targetCurrency] / data.rates[baseCurrency]})
    });
}