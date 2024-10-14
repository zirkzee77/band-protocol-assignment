import { TransactionStatus } from "./constant";

export type BroadcastResponse = {
  tx_hash: string;
};

export type CheckTransactionStatusResponse = {
  tx_status: TransactionStatus;
};

export type BroadcastParams = {
  symbol: string;
  price: number;
  timestamp: number;
};

export interface ITransactionClient {
  broadcast: (params: BroadcastParams) => Promise<string>;
  monitor: (tx_hash: string) => Promise<TransactionStatus>;
}

export interface ITransactionQueueService {
  addTransaction: (transaction: BroadcastParams) => Promise<void>;
}
