let data = async function getData() {
    let headers = {
        "accept": "application/json",
        "x-cg-demo-api-key": "CG-FzkoKNcuAo8tZRoE6xDScghL"
    }
    let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", {
        mode: 'cors',
        method: 'GET',
        headers: headers
    })
    let data = await response.json()
    return data
}

module.exports = data
