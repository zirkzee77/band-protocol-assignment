import axios from "axios";
import {
  BroadcastParams,
  BroadcastResponse,
  CheckTransactionStatusResponse,
  ITransactionClient,
} from "./type";
import { TransactionStatus } from "./constant";

class TransactionClient implements ITransactionClient {
  public async broadcast(params: BroadcastParams): Promise<string> {
    const { symbol, price, timestamp } = params;
    if (!this._validateUint64(price))
      throw new Error(` Invalid price data type ${JSON.stringify(params)}`);
    if (!this._validateUint64(timestamp))
      throw new Error(` Invalid timestamp data type ${JSON.stringify(params)}`);
    const response = await axios.post<BroadcastResponse>(
      `https://mock-node-wgqbnxruha-as.a.run.app/broadcast`,
      {
        symbol,
        price,
        timestamp,
      }
    );
    return response.data.tx_hash;
  }

  public async monitor(tx_hash: string): Promise<TransactionStatus> {
    const respone = await axios.get<CheckTransactionStatusResponse>(
      `https://mock-node-wgqbnxruha-as.a.run.app/check/${tx_hash}`
    );
    return respone.data.tx_status;
  }

  private _validateUint64(num: number): boolean {
    if (!Number.isInteger(num)) {
      return false;
    }
    const numBigInt = BigInt(num);
    return (
      numBigInt >= BigInt(0) && numBigInt <= BigInt("18446744073709551615")
    );
  }
}

export default TransactionClient;
