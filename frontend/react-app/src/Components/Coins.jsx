import { useEffect, useState } from "react"
import {io} from "socket.io-client"

const Coins = () => {
    const [coins, getCoins] = useState([])
    const fetchCoins = async () => {
        let headers = {
            "accept": "application/json"
        }
        let response = await fetch("http://localhost:4000/getcoins", {
            mode: 'cors',
            method: 'GET',
            headers: headers
        })
        let data = await response.json()
        return data
    }
    useEffect(() => {
        const socket = io('http://localhost:4000')
        // fetchCoins().then((res) => getCoins(res)).catch(err => console.log(err))
        socket.on("res",(arg)=>{
            console.log(arg)
        })
        console.log("hello")
    }, [])
    return (
        <>
            <table className="table-auto border-slate-400 w-[95%] m-[20px_auto]">
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

                    {
                        coins.map(function (coin) {
                            return (
                                <tr key={coin.market_cap_rank} className="m-2 p-2 h-[50px] hover:bg-slate-200">
                                    <td className="text-center">{coin.market_cap_rank}</td>
                                    <td className="flex pl-2 m-[2px_auto]"><img src={coin.image} className="h-[32px] w-[32px] pt-2"></img><p className="pt-2 pl-4">{coin.name}</p></td>
                                    <td className="pl-4 text-center">${coin.current_price}</td>
                                    <td className="pl-4 text-center">${coin.total_volume}</td>
                                    <td className="flex pl-4 text-center">{coin.price_change_percentage_24h < 0 ? <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAeUlEQVR4nO3QPQqAMAyG4V5C8VpfIMfVWXFz8SztEumgm/Qv1SUvBAIZHohzlmVZVm0eWAKRaI4nmtMw0aYOA2sSFuYhEB1qMHAK85T1bjW8BFXDa9BmvAWtxjXQYlwTzcZ7oEm8J/qKf4HeCTB6YI8T9+dgWZb7oQuMqbDytPcIYAAAAABJRU5ErkJggg==" /> : <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3QMQqAMAyF4V5CwbtE2sUj2Ax6VMUqCApOLh5Hkc5iW1MRzA8Psn0QITiO+2XFWKfS4HLuvF9BYSgT1eGqDO52esv7KnsZxfg4XKIRcbhFI+DgjBLi4I0S4BCMPsDhMRqAAxnqicsOZzrUTho9OcC6jQA3Tu/mOI77dAc9Un/8IXi0pAAAAABJRU5ErkJggg==" />}{coin.price_change_percentage_24h}</td>
                                    <td className="pl-4 text-center">${coin.market_cap}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
export default Coins