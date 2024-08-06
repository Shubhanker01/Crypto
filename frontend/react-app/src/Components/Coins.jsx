import { useEffect, useState } from "react"

const Coins = () => {
    const [coins, getCoins] = useState([])
    const fetchCoins = async () => {
        let headers = {
            "accept": "application/json",
            "x-cg-demo-api-key": "CG-FzkoKNcuAo8tZRoE6xDScghL"
        }
        let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", {
            method: 'GET',
            headers: headers
        })
        let data = await response.json()
        return data
    }
    useEffect(() => {
        fetchCoins().then((res) => getCoins(res)).catch(err => console.log(err))
    }, [coins])
    return (
        <>
            <table className="table-auto border-slate-400">
                <thead>
                    <tr>
                        <th className="border border-slate-300">#</th>
                        <th className="border border-slate-300">Coin</th>
                        <th className="border border-slate-300">Price</th>
                        <th className="border border-slate-300">Volume</th>
                        <th className="border border-slate-300">24hr</th>
                        <th className="border border-slate-300">Market Cap</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            coins.map(function (coin) {
                                return (
                                    <tr>
                                        <td className="border border-slate-300">{coin.market_cap_rank}</td>
                                        <td className="border border-slate-300">{coin.name}</td>
                                        <td className="border border-slate-300">${coin.current_price}</td>
                                        <td className="border border-slate-300">${coin.total_volume}</td>
                                        <td className="border border-slate-300">{coin.price_change_percentage_24h}</td>
                                        <td className="border border-slate-300">${coin.market_cap}</td>
                                    </tr>
                                )
                            })
                        }

                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default Coins