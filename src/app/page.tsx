"use client"
import { useState, useEffect } from "react"

import { EthereumPriceData, EthereumGasPriceData } from "../types/dataTypes"
import useEthereumDataStream from '../hooks/useEthereumDataStream';
import {
  LIVE_ETH_PRICE,
  LIVE_ETH_GAS_PRICES,
  GWEI,
  USD,
  SLOW,
  MEDIUM,
  FAST,
  BASE,
  DOLLAR_SIGN,
  TIME_UNTIL_NEXT_UPDATE,
  SECONDS,
  ETH_PRICE_DATA,
  GAS_PRICE_DATA,
  INTERVAL_TICK
} from "../utils/strings"
import { formatNumber } from "../utils/utils"

export default function Home() {
  const [ethPrice, setEthPrice] = useState<EthereumPriceData>({ price: "0" });
  const [gasPrices, setGasPrices] = useState<EthereumGasPriceData>({ slow: "0", med: "0", fast: "0", base: "0", lastBlock: "0" });
  const [timeToUpdate, setTimeToUpdate] = useState(0)

  const dataStream = useEthereumDataStream(process.env.NEXT_PUBLIC_BE_URL || "");

  useEffect(() => {
    if (dataStream) {
      dataStream.on(ETH_PRICE_DATA, (priceData: EthereumPriceData) => {
        setEthPrice(priceData)
        console.log(priceData);
      });
      dataStream.on(GAS_PRICE_DATA, (gasPriceData: EthereumGasPriceData) => {
        setGasPrices(gasPriceData)
        console.log(gasPriceData);
      });
      dataStream.on(INTERVAL_TICK, (intervalTick: number) => {
        setTimeToUpdate(intervalTick)
        console.log(intervalTick);
      });
    }
  }, [dataStream]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4">
        <section className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{LIVE_ETH_PRICE}</h1>
          <p className="text-lg text-gray-600">{DOLLAR_SIGN}{formatNumber(ethPrice.price)} {USD}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{LIVE_ETH_GAS_PRICES} ({GWEI})</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-2 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">{SLOW}</h3>
              <p className="text-gray-600">{formatNumber(gasPrices.slow)} {GWEI}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">{MEDIUM}</h3>
              <p className="text-gray-600">{formatNumber(gasPrices.med)} {GWEI}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">{FAST}</h3>
              <p className="text-gray-600">{formatNumber(gasPrices.fast)} {GWEI}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700">{BASE}</h3>
              <p className="text-gray-600">{formatNumber(gasPrices.base)} {GWEI}</p>
            </div>
          </div>
        </section>
        <p className="text-lg font-semibold text-gray-700 mb-2 mt-4">{TIME_UNTIL_NEXT_UPDATE} {timeToUpdate}{SECONDS}</p>
      </div>
    </main>
  )
}
