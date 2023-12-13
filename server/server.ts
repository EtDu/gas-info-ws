import express from 'express';
import axios from 'axios';
import { createServer } from 'http';
import { Server } from 'socket.io';

import DataStore from "./dataStore"
import {
  LATEST_ETH_PRICE_URL,
  GAS_PRICES_URL,
  REFRESH_TIME_MS,
  TIME_TO_REFRESH_INTERVAL_MS,
  PUBLIC_URL,
  PORT
} from "./utils/constants"
import {
  ETH_PRICE_CHANGED,
  GAS_PRICE_CHANGED,
  ETH_PRICE_DATA,
  GAS_PRICE_DATA,
  INTERVAL_TICK
} from "./utils/strings"
import {
  EthereumPriceData,
  EthereumGasPriceData,
} from "./utils/types"

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: PUBLIC_URL,
    methods: ["GET", "POST"]
  }
});
const dataStore = new DataStore()

dataStore.on(ETH_PRICE_CHANGED, (ethereumPriceData: EthereumPriceData) => {
  if (io.engine.clientsCount > 0) io.emit(ETH_PRICE_DATA, ethereumPriceData);
})

dataStore.on(GAS_PRICE_CHANGED, (ethereumGasPriceData: EthereumGasPriceData) => {
  if (io.engine.clientsCount > 0) io.emit(GAS_PRICE_DATA, ethereumGasPriceData);
})

const StartSecondsToDisplay = REFRESH_TIME_MS / TIME_TO_REFRESH_INTERVAL_MS;
let intervalCounter = StartSecondsToDisplay;
setInterval(() => {
  io.emit(INTERVAL_TICK, intervalCounter)
  if (intervalCounter == 0) {
    axios.get(LATEST_ETH_PRICE_URL).then((res) => {
      dataStore.setEthereumPriceData(res)
    })
    axios.get(GAS_PRICES_URL).then((res) => {
      dataStore.setEthereumGasPriceData(res)
    })
    intervalCounter--;
    intervalCounter = StartSecondsToDisplay
    return
  }
  intervalCounter--;
}, TIME_TO_REFRESH_INTERVAL_MS);


httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});