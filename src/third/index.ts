import TransactionClient from "./transaction-client";
import TransactionQueueService from "./transaction-queue-service";

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

main();
