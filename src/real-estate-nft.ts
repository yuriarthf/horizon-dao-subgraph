import { Bytes, BigDecimal, BigInt, ethereum, Address } from "@graphprotocol/graph-ts";

import {
  TransferSingle as TransferSingleEvent,
  TransferBatch as TransferBatchEvent,
} from "../generated/RealEstateNFT/RealEstateNFT";

import { Balance, RealEstateAccount } from "../generated/schema";

export function handleTransferSingle(event: TransferSingleEvent): void {
  if (!event.params.from.equals(Address.zero())) {
    const fromBalanceId = Bytes.fromByteArray(
      Bytes.fromBigInt(event.params.id).concat(Bytes.fromHexString(event.params.from.toHexString())),
    );
    const fromBalance = Balance.load(fromBalanceId)!;
    fromBalance.amount = fromBalance.amount.minus(event.params.value);
  }

  const toBalanceId = Bytes.fromByteArray(
    Bytes.fromBigInt(event.params.id).concat(Bytes.fromHexString(event.params.to.toHexString())),
  );
  let toBalance = Balance.load(toBalanceId);
  if (!toBalance) {
    toBalance = new Balance(toBalanceId);
    toBalance.tokenId = event.params.id;
    toBalance.amount = event.params.value;
    toBalance.save();
    const toAccountId = Bytes.fromHexString(event.params.to.toHexString());
    let toAccount = RealEstateAccount.load(toAccountId);
    if (!toAccount) {
      toAccount = new RealEstateAccount(toAccountId);
      toAccount.address = Bytes.fromHexString(event.params.to.toHexString());
      if (!toAccount.balances) {
        toAccount.balances = [toBalance.id];
      } else {
        toAccount.balances!.push(toBalance.id);
      }
      toAccount.save();
    }
  } else {
    toBalance.amount = toBalance.amount.plus(event.params.value);
    toBalance.save();
  }
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  for (let i = 0; i < event.params.ids.length; i++) {
    const fromBalanceId = Bytes.fromByteArray(
      Bytes.fromBigInt(event.params.ids[i]).concat(Bytes.fromHexString(event.params.from.toHexString())),
    );
    const fromBalance = Balance.load(fromBalanceId)!;
    fromBalance.amount = fromBalance.amount.minus(event.params.values[i]);

    const toBalanceId = Bytes.fromByteArray(
      Bytes.fromBigInt(event.params.ids[i]).concat(Bytes.fromHexString(event.params.to.toHexString())),
    );
    let toBalance = Balance.load(toBalanceId);
    if (!toBalance) {
      toBalance = new Balance(toBalanceId);
      toBalance.tokenId = event.params.ids[i];
      toBalance.amount = event.params.values[i];
      toBalance.save();
      const toAccountId = Bytes.fromHexString(event.params.to.toHexString());
      let toAccount = RealEstateAccount.load(toAccountId);
      if (!toAccount) {
        toAccount = new RealEstateAccount(toAccountId);
        toAccount.address = Bytes.fromHexString(event.params.to.toHexString());
        if (!toAccount.balances) {
          toAccount.balances = [toBalance.id];
        } else {
          toAccount.balances!.push(toBalance.id);
        }
        toAccount.save();
      }
    } else {
      toBalance.amount = toBalance.amount.plus(event.params.values[i]);
      toBalance.save();
    }
  }
}
