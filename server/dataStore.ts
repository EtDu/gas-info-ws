import EventEmitter from "events"

import {
  EthereumPriceData,
  EthereumGasPriceData,
  EtherscanPriceResponse,
  EtherscanGasPriceResponse
} from "./utils/types"

export default class DataStore extends EventEmitter {
  ethereumPriceData: EthereumPriceData | null;
  ethereumGasPriceData: EthereumGasPriceData | null

  constructor() {
    super();
    this.ethereumPriceData = null
    this.ethereumGasPriceData = null
  }

  getEthereumPriceData() {
    return this.ethereumPriceData;
  }

  getEthereumGasPriceData() {
    return this.ethereumGasPriceData
  }

  setEthereumPriceData(res: EtherscanPriceResponse) {
    const price: EthereumPriceData = { price: res.data.result.ethusd }

    this.ethereumPriceData = price;
    this.emit('ethereumPriceDataChanged', this.ethereumPriceData)
  }

  setEthereumGasPriceData(res: EtherscanGasPriceResponse) {
    const {
      LastBlock,
      SafeGasPrice,
      ProposeGasPrice,
      FastGasPrice,
      suggestBaseFee
    } = res.data.result

    const prices: EthereumGasPriceData = {
      slow: SafeGasPrice,
      med: ProposeGasPrice,
      fast: FastGasPrice,
      base: suggestBaseFee,
      lastBlock: LastBlock
    }

    this.ethereumGasPriceData = prices;
    this.emit('ethereumGasPriceDataChanged', this.ethereumGasPriceData)
  }
}