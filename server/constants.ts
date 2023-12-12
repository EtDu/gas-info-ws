import 'dotenv/config'

const {
  ETHERSCAN_API_KEY,
  FE_URL
} = process.env

const LATEST_ETH_PRICE_URL: string = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_API_KEY}`
const GAS_PRICES_URL: string = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
const REFRESH_TIME_MS: number = 10000
const TIME_TO_REFRESH_INTERVAL_MS: number = 1000

export {
  LATEST_ETH_PRICE_URL,
  GAS_PRICES_URL,
  REFRESH_TIME_MS,
  TIME_TO_REFRESH_INTERVAL_MS,
  FE_URL
}