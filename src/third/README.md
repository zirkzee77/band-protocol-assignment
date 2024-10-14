# Transaction Broadcasting and Monitoring Client

Overview

- This module provides functionality to broadcast a transaction to a server, monitor its status, and retrieve updates until the transaction is finalized. It supports broadcasting the transaction, checking its status, and handling various transaction outcomes (CONFIRMED, FAILED, PENDING, DNE).

Features

- Broadcast Transaction: Sends a POST request to broadcast transaction details (symbol, price, timestamp).
- Transaction Status Monitoring: Monitors transaction status through repeated GET requests.

Validation

- Validate price and timestamp when broadcasting transaction: Api reference need uint64 but javascript number support double-precision (64 bit) format.

Integrating the Client

- TransactionQueueService: A class designed to manage and process multiple transactions in a queue system. It interacts with a transaction server using TransactionClient, broadcasting transactions and monitoring their statuses.
- Example script source: src/third/index.ts
- Integration
  - addTransaction method: use TransactionClient broadcast method to get tx_hash and push into the end of queue
  - processTransaction method: use TransactionClient monitor method to get current tx_status and decide what to next
- Status handling strategy
  - PENDING - Add it to the end of queue
  - Confirm - Log tx_hash with status Confirmed
  - DNE, FAILED - Throw Error
  - Other status - Throw Error

How to Run Example Script

- Install dependencies using npm install.
- Build executable js files using npm run build
- Run the application using npm run third.

Errors

- Transaction does not exist: GET transaction status return DNE which cause is invalid tx_hash
- Transaction failed: GET transaction status return FAILED
- Invalid transaction status {status}: GET transaction status return status other than (CONFIRMED, FAILED, PENDING, DNE)

Example Script

```
const main = async () => {
  const transactionClient = new TransactionClient();
  const transactionQueueService = new TransactionQueueService(
    transactionClient
  );
  const transactions = [
    { symbol: "BTC", price: 30000, timestamp: Date.now() },
    { symbol: "BAND", price: 1, timestamp: Date.now() },
    { symbol: "ETH", price: -50, timestamp: Date.now() },
    { symbol: "ADA", price: 218446744073709551615, timestamp: Date.now() },
    { symbol: "XRP", price: 1.2, timestamp: Date.now() },
  ];
  for (const transaction of transactions) {
    setTimeout(() => {
      console.log(`Adding transaction: ${JSON.stringify(transaction)}`);
      transactionQueueService.addTransaction(transaction);
    }, Math.random() * 5000);
  }
};
```

Example Script Result

```
Adding transaction: {"symbol":"BAND","price":1,"timestamp":1728911160892}
Broadcasted: {"symbol":"BAND","price":1,"timestamp":1728911160892} transaction hash is 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2
Processing transaction: 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2
Transaction 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2 is pending, re-queuing...
Adding transaction: {"symbol":"BTC","price":30000,"timestamp":1728911160892}
Broadcasted: {"symbol":"BTC","price":30000,"timestamp":1728911160892} transaction hash is fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239
Processing transaction: 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2
Transaction 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2 is pending, re-queuing...
Adding transaction: {"symbol":"ADA","price":218446744073709550000,"timestamp":1728911160892}
Error:  Invalid price data type {"symbol":"ADA","price":218446744073709550000,"timestamp":1728911160892}
Processing transaction: fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239
Adding transaction: {"symbol":"ETH","price":-50,"timestamp":1728911160892}
Error:  Invalid price data type {"symbol":"ETH","price":-50,"timestamp":1728911160892}
Transaction fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239 is pending, re-queuing...
Processing transaction: 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2
Transaction 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2 is pending, re-queuing...
Adding transaction: {"symbol":"XRP","price":1.2,"timestamp":1728911160892}
Error:  Invalid price data type {"symbol":"XRP","price":1.2,"timestamp":1728911160892}
Processing transaction: 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2
Transaction 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2 is pending, re-queuing...
Processing transaction: fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239
Transaction fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239 is pending, re-queuing...
Processing transaction: 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2
Transaction 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2 is pending, re-queuing...
Processing transaction: fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239
Transaction fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239 is pending, re-queuing...
Processing transaction: 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2
Processed: transaction 98912d0c0f6c5f6011a39eed9b137ee26b04d583ff5cdbec84d8b8403cf2e6d2 is confirmed
Processing transaction: fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239
Transaction fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239 is pending, re-queuing...
Processing transaction: fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239
Transaction fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239 is pending, re-queuing...
Processing transaction: fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239
Transaction fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239 is pending, re-queuing...
Processing transaction: fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239
Transaction fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239 is pending, re-queuing...
Processing transaction: fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239
Processed: transaction fc31edc512f83920693c8ac467da7ee96a748e2722b81611f3279379dd29e239 is confirmed
```
