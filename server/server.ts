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
  FE_URL
} from "./constants"
import {
  ETH_PRICE_CHANGED,
  GAS_PRICE_CHANGED,
  ETH_PRICE_DATA,
  GAS_PRICE_DATA,
  INTERVAL_TICK
} from "../src/utils/strings"
import {
  EthereumPriceData,
  EthereumGasPriceData,
} from "../src/types/dataTypes"

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: FE_URL,
    methods: ["GET"]
  }
});
const dataStore = new DataStore()
io.on('connection', (socket) => {
  console.log('A client connected');
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

dataStore.on(ETH_PRICE_CHANGED, (ethereumPriceData: EthereumPriceData) => {
  if (io.engine.clientsCount > 0) io.emit(ETH_PRICE_DATA, ethereumPriceData);
})

dataStore.on(GAS_PRICE_CHANGED, (ethereumGasPriceData: EthereumGasPriceData) => {
  if (io.engine.clientsCount > 0) io.emit(GAS_PRICE_DATA, ethereumGasPriceData);
})

const StartSecondsToDisplay = REFRESH_TIME_MS / TIME_TO_REFRESH_INTERVAL_MS;
let intervalCounter = StartSecondsToDisplay;
setInterval(() => {
  console.log(intervalCounter)
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


const PORT = 3001; // Replace with your preferred port
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});