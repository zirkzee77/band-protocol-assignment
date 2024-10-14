import EventEmitter from "node:events";
import TransactionClient from "./transaction-client";
import { BroadcastParams, ITransactionQueueService } from "./type";
import { TransactionStatus } from "./constant";

class TransactionQueueService
  extends EventEmitter
  implements ITransactionQueueService
{
  private _queue: string[] = [];
  private _client: TransactionClient;

  constructor(transactionClient: TransactionClient) {
    super();
    this._client = transactionClient;
    this._listen();
  }

  public async addTransaction(transaction: BroadcastParams) {
    try {
      const tx_hash = await this._client.broadcast({
        symbol: transaction.symbol,
        price: transaction.price,
        timestamp: transaction.timestamp,
      });
      console.log(
        `Broadcasted: ${JSON.stringify(
          transaction
        )} transaction hash is ${tx_hash}`
      );
      this._queue.push(tx_hash);
      this.emit("newTransaction");
    } catch (error) {
      console.log(`${error}`);
    }
  }

  private _listen() {
    this.on("newTransaction", async () => {
      if (this._queue.length > 0) {
        const transaction = this._queue.shift();
        if (transaction) {
          await this._processTransaction(transaction);
          this.emit("newTransaction");
        }
      }
    });
  }

  private async _processTransaction(tx_hash: string) {
    console.log(`Processing transaction: ${tx_hash}`);
    try {
      const status = await this._client.monitor(tx_hash);
      this._handleTransactionStatus(status, tx_hash);
      await this._delay(3000);
    } catch (error) {
      console.log(`${error}`);
    }
  }

  private _handleTransactionStatus(
    tx_status: TransactionStatus,
    tx_hash: string
  ): void {
    switch (tx_status) {
      case TransactionStatus.Pending: {
        console.log(`Transaction ${tx_hash} is pending, re-queuing...`);
        this._queue.push(tx_hash);
        break;
      }
      case TransactionStatus.Confirmed: {
        console.log(`Processed: transaction ${tx_hash} is confirmed`);
        break;
      }
      case TransactionStatus.DoesNotExist: {
        throw new Error(`Transaction ${tx_hash} does not exist`);
      }
      case TransactionStatus.Failed: {
        throw new Error(`Transaction ${tx_hash} failed`);
      }
      default: {
        throw new Error(`Invalid transaction status ${tx_status}`);
      }
    }
  }

  private _delay(ms: number): Promise<void> {
    return new Promise((f) => setTimeout(f, ms));
  }
}

export default TransactionQueueService;
