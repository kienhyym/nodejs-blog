const axios = require('axios')

const weatherControler = async (req, res) => {
    const data = await axios.get(
        'http://api.weatherstack.com/current?access_key=816d33d9120feef4f8aef2e9de22e0a2&query=New%20York'
    )
    return res.render('weather', { weather: data.data })
}

module.exports = {
    weatherControler,
}
